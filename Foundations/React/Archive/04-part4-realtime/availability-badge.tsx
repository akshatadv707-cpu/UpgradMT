// Challenge solution — SSE live availability (runnable)
// Same as practice-solutions/04-part4-realtime/05-availability-badge.tsx
// Save as: app/components/AvailabilityBadge.tsx

"use client";

import { useEffect, useState } from "react";

type Props = { hotelId: string; hotelName: string };

export function AvailabilityBadge({ hotelId, hotelName }: Props) {
  const [roomsLeft, setRoomsLeft] = useState<number | null>(null);

  useEffect(() => {
    const source = new EventSource(
      `/api/availability/stream?hotelId=${encodeURIComponent(hotelId)}`
    );

    source.onmessage = (event) => {
      const data = JSON.parse(event.data) as { roomsLeft: number };
      setRoomsLeft(data.roomsLeft);
    };

    return () => source.close();
  }, [hotelId]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="font-semibold">{hotelName}</h3>
      <p className="mt-1 text-sm text-gray-600">
        {roomsLeft === null
          ? "Checking availability..."
          : roomsLeft === 0
            ? "Sold out"
            : `${roomsLeft} room${roomsLeft === 1 ? "" : "s"} left`}
      </p>
    </div>
  );
}
