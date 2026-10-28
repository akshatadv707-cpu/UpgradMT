// Given deliberately slow (simulates a slow reviews API via lib/db's
// getReviews, which sleeps 1.5s). This file is complete as-is.
// Exercises 3 and 5 are about how it gets composed into the TitleBody you
// write in Exercise 1 — as a true sibling of RatingBadge (Exercise 3), then
// wrapped in its own <Suspense> so it doesn't block the rest of the
// page (Exercise 5) — not about writing this component itself.

import { getReviews } from "@/lib/db";

export async function Reviews({ slug }: { slug: string }) {
  const reviews = await getReviews(slug);
  
  return (
    <ul className="mt-2 space-y-1 text-sm">
      {reviews.map((r, i) => (
        <li key={i}>{r}</li>
      ))}
    </ul>
  );
}
