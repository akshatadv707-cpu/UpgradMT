# Module 3 - Hands-On Lab: Movie Tracker Lab

**Nothing installed yet, or on a new machine?** See `SETUP.md` first it covers installing Node.js on Windows/macOS/Linux and running `npm install` / `npm run dev`.

A small movie & show tracker backed by a real SQLite file (`lab.db`, via Node's built-in `node:sqlite`), used to practice Next.js App Router routing, the Server/Client boundary, caching, and streaming.

**This is a self-paced lab, not the instructor demo.** Some parts are already built and working; the rest are marked `🚧 Exercise N not implemented` with a comment block of progressive hints right above the placeholder read the file before you start typing. Each exercise has 3 hint levels (a nudge → an API pointer → a near-complete answer) plus a checkpoint question. If you get all the way stuck, `solutions/SOLUTIONS.md` has the verified working code and measured numbers try to get there yourself first.

Run `npm run dev -- -p 3007` (or any free port) and keep it open while you work; most exercises are visible immediately on save.

---

## Before you start

This project runs Next.js 16.2.10 with `cacheComponents: true` a newer model than most Next.js docs/training data describe. Read `AGENTS.md` and, if you haven't already, recall the earlier fix in this session for `app/rendering/revalidated/page.tsx`: an async page that awaited a runtime API (there, a `'use cache'` read; here, `params`) directly at the top level, outside any `<Suspense>`. That exact error `Uncached data was accessed outside of <Suspense>` is the very first thing Exercise 1 asks you to reproduce and fix, on purpose. If you remember how that fix was shaped, Exercise 1 is mostly pattern-matching.

**Node's `node:sqlite` is a synchronous API.** That has a real consequence under Cache Components: synchronous work is treated as *deterministic* by default and gets folded into the static shell once, at build time — never re-run per request unless you explicitly opt in with `connection()` (per-request) or `'use cache'` + `cacheLife` (TTL-based revalidation). Exercises 3 and 4 both hinge on this.

---

## Exercise map

| # | File(s)                                   | Concept                                    | Given                              | You build                                                   |
| - | ----------------------------------------- | ------------------------------------------ | ---------------------------------- | ----------------------------------------------------------- |
| 1 | `app/titles/[slug]/page.tsx`            | Dynamic routes + runtime-API/Suspense rule | Nothing (placeholder)              | Real title render +`notFound()`                           |
| 2 | `app/titles/[slug]/WatchlistButton.tsx` | Server default vs`'use client'`          | `'use client'` directive         | Watchlist toggle button                                     |
| 3 | `app/titles/[slug]/RatingBadge.tsx`     | Real datastore + parallel siblings         | `Reviews.tsx` (slow, working)    | Live watch counter, wired as a sibling                      |
| 4 | `app/page.tsx`, `app/stats/page.tsx`  | Render modes (static/revalidated/dynamic)  | Home page (works, uncached)        | `'use cache'` on the list; a genuinely dynamic `/stats` |
| 5 | `app/titles/[slug]/page.tsx` (extend)   | Streaming SSR                              | —                                 | Nested`<Suspense>` around the slow `Reviews`            |
| 6 | `app/titles/[slug]/error.tsx`           | Error boundary containment                 | The`missing-reel` title (throws) | The error boundary itself, from scratch                     |

Exercises 1 → 2 → 3 → 5 all extend the same file (`app/titles/[slug]/page.tsx`), in that order. Exercise 4 is independent and can be done any time after Exercise 1. Exercise 6 can be done any time after Exercise 1 (you need `TitleBody` calling `getTitle('missing-reel')` for there to be anything to catch).

---

## Exercise 1 — Dynamic route + the blocking-route error

Open `app/titles/[slug]/page.tsx`. Follow the hints in the file.

**Checkpoint:** after it builds, `npm run build` and read the routetable — what marker does `/titles/[slug]` get? Then:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:PORT/titles/nonexistent-slug
```

The status code is not what most people guess for a "not found" page. Why? (Hint: this route is a Partial Prerender — headers are already sent as part of the static shell before the dynamic hole discovers the title is missing and calls `notFound()`.)

## Exercise 2 — Server default vs `'use client'`

Open `app/titles/[slug]/WatchlistButton.tsx`. Follow the hints, then wire `<WatchlistButton slug={title.slug} />` into the `TitleBody` component you wrote in Exercise 1.

**Checkpoint:** why does the button need its own file with `'use client'` at the top, instead of just adding `'use client'` to the top of `page.tsx`?

## Exercise 3 — A real datastore + true parallel siblings

Open `app/titles/[slug]/RatingBadge.tsx`. Follow the hints, then render both `<RatingBadge slug={title.slug} />` and `<Reviews slug={title.slug} />` as siblings inside `TitleBody` (not one awaited before the other).

**Checkpoint:** `Reviews` sleeps 1.5s, `RatingBadge` should be near-instant.

```bash
curl -s -o /dev/null -w "Total: %{time_total}s\n" http://localhost:PORT/titles/nebula-drift
```

If the total lands near 1.5s (not ~1.5s + something extra), the two fetches ran in parallel, not one after the other.

## Exercise 4 — Render modes

**4a:** Open `app/page.tsx`. Follow the hints to add `'use cache'` + `cacheLife` around the title-list read.

**4b:** Open `app/stats/page.tsx`. Follow the hints to make it genuinely dynamic with `connection()`.

**Checkpoint:** `npm run build` and compare the route table entries for `/` and `/stats`. Both call a synchronous SQLite function from `lib/db.ts`why do they end up rendered completely differently?

## Exercise 5 — Streaming SSR

Extend `app/titles/[slug]/page.tsx` again: wrap just `<Reviews slug={title.slug} />` (not `RatingBadge`) in its own `<Suspense fallback={...}>`, nested inside the `TitleBody` you already built.

**Checkpoint:**

```bash
curl -s -o /dev/null -w "TTFB: %{time_starttransfer}s  Total: %{time_total}s\n" \
  http://localhost:PORT/titles/nebula-drift
```

Before this exercise, TTFB and Total were close together (everything waited for the slowest sibling). After it, TTFB should drop sharply while Total stays roughly the same. What's arriving at TTFB if the reviews haven't loaded yet?

## Exercise 6 — Error boundary containment

The `missing-reel` title (`getTitle('missing-reel')` in `lib/db.ts`) always throws — this is given, not something you write. Right now,
hitting `/titles/missing-reel` still doesn't crash the *server* (Next.js has a built-in fallback error boundary), but the user just sees a stuck loading state with no way to recover. Create `app/titles/[slug]/error.tsx` from scratch.

- It must be a Client Component (`'use client'` at the top).
- Its props in this Next.js version are `{ error, unstable_retry }` **not** `{ error, reset }`, which is what most Next.js docs/training data describe. Check `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md` for the exact current shape if you want to confirm before writing it.
- Render the error message and a "Try again" button that calls `unstable_retry()`.

**Checkpoint:** after adding it, `curl -s http://localhost:PORT/titles/missing-reel` do you see your error UI in the raw HTML? Why or why not, and what would you need to do to actually see it?

---

## Wrap-up

Every exercise here was really about the same question as the module lecture: *when does a piece of a page get computed, and does the user have to wait for it?* File-system routing decided what code runs for a URL (Ex1). The Server/Client boundary decided what ships to the browser at all (Ex2). A real datastore plus parallel siblings decided whether independent fetches stack or overlap (Ex3). `'use cache'` vs `connection()` decided whether "compute it" meant "reuse the last result" or "do it again, right now" (Ex4). `<Suspense>` decided whether a slow part blocks everything else or streams in later (Ex5). And `error.tsx` decided how much of the page a single failure is allowed to take down with it (Ex6).
