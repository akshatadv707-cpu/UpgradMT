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
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{hotelName}</h3>
      <p className="mt-2 text-2xl font-bold text-blue-700">
        {roomsLeft === null
          ? "…"
          : roomsLeft === 0
            ? "Sold out"
            : roomsLeft}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        {roomsLeft === null
          ? "Checking availability..."
          : roomsLeft === 0
            ? "No rooms left"
            : `room${roomsLeft === 1 ? "" : "s"} left`}
      </p>
    </div>
  );
}
