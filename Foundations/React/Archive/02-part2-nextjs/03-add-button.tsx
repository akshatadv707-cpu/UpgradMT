"use client";

// Challenge 2: Client Component for interactivity
// Save as: app/components/AddButton.tsx

import { useState } from "react";

export function AddButton() {
  const [clicks, setClicks] = useState(0);

  return (
    <button type="button" onClick={() => setClicks(clicks + 1)}>
      Client button ({clicks})
    </button>
  );
}
