"use client";

// Challenge 3: Counter with hover/focus styles
// Save as: app/components/Counter.tsx

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setCount(count + 1)}
      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Clicked {count} times
    </button>
  );
}
