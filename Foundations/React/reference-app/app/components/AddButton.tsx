"use client";

// Part 2 practice: Client Component for interactivity
import { useState } from "react";

export function AddButton() {
  const [clicks, setClicks] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setClicks(clicks + 1)}
      className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
    >
      Client button ({clicks})
    </button>
  );
}
