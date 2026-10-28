// EXERCISE 4b — Force genuine per-request rendering
//
// Goal: show the live total watch count across all titles, recomputed on
// EVERY request — the opposite of Exercise 4a's periodic revalidation.
//
// HINT — same runtime-deferral function as RatingBadge (Exercise 3),
// wrapped in <Suspense> here:
//   import { Suspense } from 'react';
//   import { connection } from 'next/server';
//   import { getTotalWatches } from '@/lib/db';
//   async function TotalWatches() {
//     await connection();
//     const total = getTotalWatches();
//     return <p>Total watches across all titles: {total}</p>;
//   }
//   export default function StatsPage() {
//     return (
//       <div>
//         <h1>Live Stats</h1>
//         <Suspense fallback={<p>Loading…</p>}>
//           <TotalWatches />
//         </Suspense>
//       </div>
//     );
//   }
//
// Checkpoint — `npm run build`: what marker do you expect for `/stats`?
// Both `/` and `/stats` read the same kind of synchronous SQLite call —

import { getTotalWatches } from "@/lib/db";
import { connection } from "next/server";
import { Suspense } from "react";

// why do they end up with different markers?
async function TotalWatches(){
  await connection();
  const total=getTotalWatches();
  return <p>total watches per title:{total}</p>
}


export default function StatsPage(){
  return(
    <div>
      <Suspense fallback={<p>Loading…</p>}>
      <TotalWatches/>
      </Suspense>
    </div>
  );
}
