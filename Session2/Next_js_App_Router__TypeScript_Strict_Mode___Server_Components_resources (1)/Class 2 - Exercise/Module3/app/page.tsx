import Link from "next/link";
import { listTitles } from "@/lib/db";

// EXERCISE 4a — Render modes: from static to revalidated
//
// listTitles() is baked into the static shell at build time (`○`, no
// Revalidate/Expire). Goal: make it re-check the DB every 10s instead —
// without going fully dynamic.
//
// HINT — pull the list into its own async component with 'use cache' +
// cacheLife (same shape as app/rendering/revalidated/page.tsx):
//   import { cacheLife, cacheTag } from 'next/cache';
//   async function TitleList() {
//     'use cache';
//     cacheTag('titles-list');
//     cacheLife({ stale: 10, revalidate: 10, expire: 3600 });
//     const titles = listTitles();
//     return ( /* the grid of title cards, same as below */ );
//   }
// then render <TitleList /> in place of the inline grid below
//
// Checkpoint — `npm run build`: what changed in the route table for `/`?

import { cacheLife, cacheTag } from 'next/cache';


const POSTER_STYLES = [
  "from-rose-400 to-orange-400",
  "from-sky-400 to-indigo-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-purple-500",
  "from-amber-400 to-pink-500",
];

export default function HomePage() {
  const titles = listTitles();
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Movie Tracker</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        A small watch tracker backed by SQLite (<code>lab.db</code>).
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {titles.map((t, i) => (
          <li key={t.slug}>
            <Link
              href={`/titles/${t.slug}`}
              className="group block overflow-hidden rounded-xl border border-black/10 bg-white transition hover:-translate-y-0.5 hover:border-black/20 hover:shadow-lg dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white/20"
            >
              <div
                className={`flex h-28 items-center justify-center bg-gradient-to-br text-3xl font-bold text-white/90 ${POSTER_STYLES[i % POSTER_STYLES.length]}`}
              >
                {t.title.charAt(0)}
              </div>
              <div className="p-4">
                <p className="font-medium">{t.title}</p>
                <p className="mt-1 text-xs text-neutral-500 transition group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                  View details →
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

 

  async function TitleList() {
    "use cache";
    cacheTag("title-list");
    cacheLife({ stale:10, revalidate:10 , expire:3600});

    const titles=listTitles();
    return(
      <ul>{titles.map((t)=>
        <li key={t.slug}>{t.title}
        </li>)}
      </ul>
    );
  }

