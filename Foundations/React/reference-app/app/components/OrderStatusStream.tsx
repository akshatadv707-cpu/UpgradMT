"use client";

import { useEffect, useState } from "react";

export function OrderStatusStream() {
  const [status, setStatus] = useState("Connecting...");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const source = new EventSource("/api/orders/stream");

    source.onmessage = (event) => {
      const payload = JSON.parse(event.data) as { status: string };
      setStatus(payload.status);
    };

    source.onerror = () => {
      setDone(true);
      setStatus((prev) => (prev === "Connecting..." ? "Connection lost" : `${prev} (stream ended)`));
      source.close();
    };

    return () => source.close();
  }, []);

  return (
    <p className="rounded border border-gray-200 bg-white p-3">
      Order status: <strong>{status}</strong>
      {done ? " — open this page again to replay." : ""}
    </p>
  );
}
