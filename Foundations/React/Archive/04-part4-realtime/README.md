# Part 4 challenge — Plan a real-time feature (runnable solutions)

Students fill in `REALTIME-PLAN.md` first. Then compare with the written plans **and** run the code.

## Quick start (standalone challenge project)

```bash
cd realtime-challenge-app
npm install
npm run dev          # terminal 1 → http://localhost:3000
npm run ws           # terminal 2 (for support chat)
```

See `realtime-challenge-app/README.md` for walk-through steps.

## Quick start (all-in-one reference app)

```bash
cd ../../practice-solutions/reference-app
npm install
npm run dev && npm run ws
```

Open http://localhost:3000/realtime

---

## Written plans (conceptual)

| File | Example |
|------|---------|
| `REALTIME-PLAN.md` | Blank student worksheet |
| `REALTIME-PLAN-SOLUTION.md` | SSE — hotel availability plan |
| `REALTIME-PLAN-SOLUTION-chat.md` | Socket.io/WebSocket — support chat plan |

## Runnable code (copy into your app)

| File | Save as | Challenge example |
|------|---------|-------------------|
| `availability-badge.tsx` | `app/components/AvailabilityBadge.tsx` | Example 1 — SSE |
| `availability-stream-route.ts` | `app/api/availability/stream/route.ts` | Example 1 — SSE API |
| `support-chat.tsx` | `app/components/SupportChat.tsx` | Example 2 — WebSocket chat |
| `challenge-page.tsx` | `app/realtime/challenge/page.tsx` | Both on one page |

Also need from `../../practice-solutions/04-part4-realtime/`:

- `04-ws-server.mjs` → `scripts/ws-server.mjs`
- `npm install ws` + `"ws": "node scripts/ws-server.mjs"` in package.json

---

## What to demo in class

| Example | URL / action | What happens |
|---------|--------------|--------------|
| SSE availability | `/realtime` — hotel badges | Rooms count down every 3s |
| WebSocket chat | `/realtime` — chat box + `npm run ws` | Messages broadcast to all tabs |
| Written plan | Discuss `REALTIME-PLAN-SOLUTION.md` | Who sends what, event names |
