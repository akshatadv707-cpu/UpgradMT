// EXERCISE 1 — Dynamic route + the blocking-route error
//
// Goal: render the real title (title + overview) for this slug, call
// notFound() if it doesn't exist.
//
// `params` is a Promise here, and awaiting it directly in an async page
// triggers "Uncached data was accessed outside of <Suspense>" — same
// rule as connection()/cookies(). Fix: split into an outer component and
// an inner async component, same shape as app/rendering/revalidated/page.tsx.
//
// HINT: `getTitle` + `Title` type from '@/lib/db', `notFound` from 'next/navigation':
// async function TitleBody({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
//   const title = getTitle(slug);
//   if (!title) notFound();
//   return ( /* render title.title and title.overview */ );
// }
// export default function TitlePage({ params }: { params: Promise<{ slug: string }> }) {
//   return <Suspense fallback={<p>Loading…</p>}><TitleBody params={params} /></Suspense>;
// }
//
// Checkpoint — `npm run build`: what marker does /titles/[slug] get?
// `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:PORT/titles/nonexistent-slug`


import { Suspense } from "react";
import { getTitle} from "@/lib/db";
import { notFound } from "next/navigation";
import { WatchlistButton } from "./WatchlistButton";
import { Reviews } from "./Reviews";
import { RatingBadge } from "./RatingBadge";

async function TitleBody({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = getTitle(slug);

  if (!title) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">{title.title}</h1>
      <p className="mt-2">{title.overview}</p>
      <div className="mt-4">
        <WatchlistButton slug={title.slug} />
      </div>
      <section className="mt-6">
        <h2 className="font-semibold">Watch count</h2>
        <Suspense fallback={<p>Loading watch count…</p>}>
          <RatingBadge slug={title.slug} />
        </Suspense>
      </section>
      <section className="mt-6">
        <h2 className="font-semibold">Reviews</h2>
        <Suspense fallback={<p>Loading reviews…</p>}>
          <Reviews slug={title.slug} />
        </Suspense>
      </section>
    </div>
  );
}

export default function TitlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading title…</p>}>
      <TitleBody params={params} />
    </Suspense>
  );
}
