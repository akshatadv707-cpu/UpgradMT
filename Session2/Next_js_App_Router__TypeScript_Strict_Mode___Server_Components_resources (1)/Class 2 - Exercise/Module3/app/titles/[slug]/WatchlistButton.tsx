"use client";

import { useState } from "react";

export function WatchlistButton({ slug }: { slug: string }) {
  const key = `watchlist:${slug}`;
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        const next = !saved;
        if (next) localStorage.setItem(key, "1");
        else localStorage.removeItem(key);
        setSaved(next);
      }}
      className="rounded-md border border-black/15 px-3 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
    >
      {saved ? "In watchlist" : "Add to watchlist"}
    </button>
  );
}

