# Reference app — F3 practice solutions

Runnable Next.js app with every practice and challenge wired together.

```bash
npm install
npm run dev
```

Open http://localhost:3000

**Part 4 real-time:** http://localhost:3000/realtime — run `npm run ws` in a second terminal for WebSocket chat.

## What is inside

| Practice / challenge | File(s) |
|---------------------|---------|
| Write a component | `app/components/Greeting.tsx` |
| Pass props | `app/components/ProductCard.tsx` |
| Add a counter | `app/components/Counter.tsx` |
| Load data on mount | `app/components/PostList.tsx` |
| Part 1 challenge | `UserCard`, `Counter`, `PostList` on `app/page.tsx` |
| Explore app folder | `app/about/page.tsx` |
| Server + Client | `app/page.tsx` + `app/components/AddButton.tsx` |
| Add navigation | `app/layout.tsx`, `app/contact/page.tsx` |
| Part 2 challenge | `app/posts/[id]/page.tsx` |
| Tailwind styling | Tailwind classes throughout |
| Part 4 — SSE practice | `app/api/orders/stream/route.ts`, `OrderStatusStream.tsx` |
| Part 4 — WebSocket chat | `ChatBox.tsx`, `scripts/ws-server.mjs` (`npm run ws`) |
| Part 4 challenge | `AvailabilityBadge.tsx`, `app/api/availability/stream/route.ts` |
| Part 4 demo page | `app/realtime/page.tsx` |

Copy individual components into your own pre-read app, or study this project as the answer key.
