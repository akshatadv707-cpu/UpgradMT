# Part 4 challenge solution — Example 1: Live hotel availability (SSE)

**Challenge:** Plan a real-time feature for your Module 1 app.

This is a **complete filled-in answer** for an SSE (one-way) feature. Compare with your own `REALTIME-PLAN.md`.

---

## Feature name

Live hotel availability counter

## One-sentence description

When another guest books a room, the "rooms left" number on the search results page updates without the user refreshing.

## SSE or Socket.io?

- [x] SSE (one-way: server → client)
- [ ] Socket.io / WebSockets (two-way)

## Why this choice?

Guests only need to **see** the updated count. They do not send messages back through the same stream. SSE is simpler, works over normal HTTP, and the browser reconnects automatically if the connection drops.

## Who sends / who receives?

| Actor | Sends | Receives |
|-------|-------|----------|
| Browser | HTTP GET to open `EventSource` at `/api/availability/stream?hotelId=123` | `availability:update` events with `{ hotelId, roomsLeft }` |
| Server (Next.js API route) | SSE `data: {...}` lines when inventory changes | Booking events from internal booking service / database |

## Event names (sketch)

| Event name | Direction | Payload shape |
|------------|-----------|---------------|
| `(stream open)` | browser → server | Query: `hotelId=123` |
| `availability:update` | server → browser | `{ hotelId: string, roomsLeft: number }` |
| `(connection close)` | either side | User navigates away → `source.close()` |

## Components involved

| Component / file | Type | Role |
|------------------|------|------|
| `AvailabilityBadge.tsx` | Client (`'use client'`) | `useEffect` opens `EventSource`, `useState` holds `roomsLeft`, updates on each event |
| `app/api/availability/stream/route.ts` | Server route | Sets `Content-Type: text/event-stream`, pushes events when count changes |
| `HotelCard.tsx` | Server or Client | Displays hotel info; embeds `AvailabilityBadge` |

## Data flow (step by step)

1. User opens search results page.
2. Each `AvailabilityBadge` opens SSE to `/api/availability/stream?hotelId=X`.
3. Server sends current `roomsLeft` immediately, then keeps connection open.
4. Another user books a room → booking service updates DB → stream handler pushes new count.
5. Badge updates on screen. No refresh button.

## Questions for Session 5

1. How do we implement `text/event-stream` in a Next.js App Router route handler?
2. How do we clean up `EventSource` in `useEffect` return when the user leaves the page?

---

## Line-by-line: AvailabilityBadge (sketch)

```tsx
"use client";

import { useEffect, useState } from "react";

type Props = { hotelId: string };

export function AvailabilityBadge({ hotelId }: Props) {
  const [roomsLeft, setRoomsLeft] = useState<number | null>(null);

  useEffect(() => {
    const url = `/api/availability/stream?hotelId=${hotelId}`;
    const source = new EventSource(url);

    source.onmessage = (e) => {
      const data = JSON.parse(e.data) as { roomsLeft: number };
      setRoomsLeft(data.roomsLeft);
    };

    return () => source.close();
  }, [hotelId]);

  if (roomsLeft === null) return <span>Checking availability...</span>;
  return <span>{roomsLeft} rooms left</span>;
}
```

| Line | What it does |
|------|----------------|
| `hotelId` prop | Which hotel this badge tracks. |
| `useState<number \| null>(null)` | `null` = still waiting for first event. |
| `new EventSource(url)` | Opens one-way SSE stream for this hotel. |
| `JSON.parse(e.data)` | Server sends JSON as text inside `data: ...` lines. |
| `return () => source.close()` | Close stream when component unmounts or hotelId changes. |

---

## Discussion table (more examples)

| Feature | Choice | Why |
|---------|--------|-----|
| Live sports score ticker | SSE | Screen only receives score updates |
| Team support chat | Socket.io | User and agent both send messages |
| CI/CD build log in the UI | SSE | Server streams log lines one-way |
| Collaborative document editing | WebSockets | Both users send cursor and text changes |
