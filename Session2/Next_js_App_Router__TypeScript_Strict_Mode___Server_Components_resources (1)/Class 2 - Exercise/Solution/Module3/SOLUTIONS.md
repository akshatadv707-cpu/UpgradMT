# Module 3 Lab — Solutions

Verified against `npm run build` + `npm run start` on Next.js 16.2.10 with `cacheComponents: true`. Try each exercise yourself first  this is the answer key, not the starting point.

---

## Exercise 1 — Dynamic route + the blocking-route error

`app/titles/[slug]/page.tsx`:

```tsx
import { Suspense } from "react";
import { getTitle } from "@/lib/db";
import { notFound } from "next/navigation";

async function TitleBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = getTitle(slug);
  if (!title) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold">{title.title}</h1>
      <p className="mt-2">{title.overview}</p>
    </div>
  );
}

export default function TitlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <TitleBody params={params} />
    </Suspense>
  );
}
```

Awaiting `params` directly at the top of an async page counts as a runtime API access, same family as `connection()`/`cookies()` it has to happen inside a component that's wrapped in `<Suspense>`, not the page itself.

**Checkpoint:** `npm run build` gives `/titles/[slug]` the marker `◐` (Partial Prerender) — the `TitleBody` async hole is the dynamic part; everything else in the tree is static.

```
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:PORT/titles/nonexistent-slug
→ 200
```

Not 404. The static shell's headers (including the 200 status) are already sent before the dynamic hole resolves and discovers the slug is missing `notFound()` swaps in the not-found UI mid-stream, but the status line was already written.

## Exercise 2 — Server default vs `'use client'`

---

`app/titles/[slug]/WatchlistButton.tsx`:

```tsx
"use client";

import { useState } from "react";

export function WatchlistButton({ slug }: { slug: string }) {
  const key = `watchlist:${slug}`;
  const [saved, setSaved] = useState(false);

  return (
    <button
      onClick={() => {
        const next = !saved;
        if (next) localStorage.setItem(key, "1");
        else localStorage.removeItem(key);
        setSaved(next);
      }}
    >
      {saved ? "In watchlist" : "Add to watchlist"}
    </button>
  );
}
```

Wired into `TitleBody`:

```tsx
<WatchlistButton slug={title.slug} />
```

**Checkpoint:** the button needs its own file because `'use client'` marks the boundary for everything *imported into that file* not the file that imports it. Putting `'use client'` at the top of `page.tsx` would pull `getTitle`, the SQLite read, and the rest of the server-only tree across the boundary too.

---

## Exercise 3 — A real datastore + true parallel siblings

`app/titles/[slug]/RatingBadge.tsx`:

```tsx
import { connection } from "next/server";
import { incrementWatchCount } from "@/lib/db";

export async function RatingBadge({ slug }: { slug: string }) {
  await connection();
  const count = incrementWatchCount(slug);
  return <p>Watches: {count}</p>;
}
```

Wired into `TitleBody` as a sibling of `<Reviews/>`, not nested and not awaited first:

```tsx
<RatingBadge slug={title.slug} />
<Reviews slug={title.slug} />
```

`incrementWatchCount` is synchronous SQLite, which by default is treated as deterministic and folded into the static shell at build time. `connection()` opts it into per-request execution same escape hatch Exercise 4b uses.

**Checkpoint:**

```
curl -s -o /dev/null -w "Total: %{time_total}s\n" http://localhost:PORT/titles/nebula-drift
→ Total: 1.52s
```

`Reviews` sleeps 1.5s, `RatingBadge` is near-instant. Total lands at ~1.5s, not ~1.5s + something extra — the two fetches ran in parallel (the max of the two), not sequentially (the sum).

---

## Exercise 4 — Render modes

**4a** — `app/page.tsx`:

```tsx
import { cacheLife, cacheTag } from "next/cache";
import { listTitles } from "@/lib/db";

async function TitleList() {
  "use cache";
  cacheTag("titles-list");
  cacheLife({ stale: 10, revalidate: 10, expire: 3600 });
  const titles = listTitles();
  return (
    <ul>
      {titles.map((t) => (
        <li key={t.slug}>{t.title}</li>
      ))}
    </ul>
  );
}
```

**4b** — `app/stats/page.tsx`:

```tsx
import { Suspense } from "react";
import { connection } from "next/server";
import { getTotalWatches } from "@/lib/db";

async function TotalWatches() {
  await connection();
  const total = getTotalWatches();
  return <p>Total watches across all titles: {total}</p>;
}

export default function StatsPage() {
  return (
    <div>
      <h1>Live Stats</h1>
      <Suspense fallback={<p>Loading…</p>}>
        <TotalWatches />
      </Suspense>
    </div>
  );
}
```

**Checkpoint** — `npm run build` route table:

```
┌ ○ /                      10s      1h
└ ◐ /stats
```

Both call the same kind of synchronous SQLite function, but they end up with different markers because of what wraps the call: `'use cache'` +
`cacheLife` tells Next to treat the read as cacheable-and-revalidatable (`○` with a Revalidate/Expire window), while `connection()` tells it to treat the read as genuinely per-request (`◐`, a Partial Prerender with a dynamic hole). Confirmed live the total goes up only after a title page is actually visited, and every `/stats` request re-runs the query:

```
before: 2
(visit /titles/nebula-drift)
after:  3
```

---

## Exercise 5 — Streaming SSR

Extend `TitleBody` in `app/titles/[slug]/page.tsx`, wrapping only `<Reviews/>`

```tsx
<RatingBadge slug={title.slug} />
<Suspense fallback={<p>Loading reviews…</p>}>
  <Reviews slug={title.slug} />
</Suspense>
```

**Checkpoint:**

```
curl -s -o /dev/null -w "TTFB: %{time_starttransfer}s  Total: %{time_total}s\n" \
  http://localhost:PORT/titles/nebula-drift
→ TTFB: 0.0095s  Total: 1.52s
```

TTFB drops to ~10ms while Total stays at ~1.5s. What arrives at TTFB is the static shell plus the title/overview/`RatingBadge` — everything that doesn't depend on the slow `Reviews` fetch. The reviews list streams in over the same connection once `getReviews` resolves, instead of holding  up the entire response.

---

## Exercise 6 — Error boundary containment

`app/titles/[slug]/error.tsx` (new file):

```tsx
"use client";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div>
      <p>Something went wrong: {error.message}</p>
      <button onClick={() => unstable_retry()}>Try again</button>
    </div>
  );
}
```

Props are `{ error, unstable_retry }` in this Next.js version, not the
`{ error, reset }` shape most docs/training data describe.

**Checkpoint:**

```
curl -s http://localhost:PORT/titles/missing-reel | grep "Something went wrong"
→ (no match)
```
