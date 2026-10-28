// EXERCISE 3 — A real datastore + parallel siblings
//
// Goal: show a live "Watches: N" count using `incrementWatchCount` from
// '@/lib/db'. It's a *synchronous* SQLite call, which by default gets
// baked into the static shell at build time — you need to opt this
// component into per-request execution.
//
// HINT — same runtime-deferral function from 'next/server' you'd use
// anywhere else for non-deterministic values, called first:
//   import { connection } from 'next/server';
//   import { incrementWatchCount } from '@/lib/db';
//   export async function RatingBadge({ slug }: { slug: string }) {
//     await connection();
//     const count = incrementWatchCount(slug);
//     return <p>Watches: {count}</p>;
//   }
//
// Wire this into TitleBody as a SIBLING of <Reviews/> (not nested, not
// awaited before it) — that's what lets the two fetches run in parallel.
// Checkpoint — curl /titles/nebula-drift and compare total response time
// before vs. after both are wired in: sum of both delays (sequential) or
// roughly the max (parallel)?

import {connection} from 'next/server';
import {incrementWatchCount} from '@/lib/db';

export async function RatingBadge({slug}:{slug:string}){

    await connection();
    const count=incrementWatchCount(slug);
    return <p>watches:{count}</p>

}



