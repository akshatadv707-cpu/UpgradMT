# F3 Part 4 — Challenge (standalone project)

Runnable demo for **Challenge example 1 (SSE availability)** and **example 2 (WebSocket support chat)**.

Written plans: `../REALTIME-PLAN-SOLUTION.md` and `../REALTIME-PLAN-SOLUTION-chat.md`

## Run

**Terminal 1 — Next.js app**

```bash
cd realtime-challenge-app
npm install
npm run dev
```

Open http://localhost:3000

**Terminal 2 — WebSocket server (for support chat)**

```bash
npm run ws
```

## What to walk through

### Example 1 — SSE live availability

1. Two hotel cards show room counts
2. Every 3 seconds the count drops (simulates another guest booking)
3. Eventually shows "Sold out"
4. Explain: server pushes only — guest doesn't send data back through SSE
5. Show `app/api/availability/stream/route.ts` and `AvailabilityBadge.tsx`

### Example 2 — WebSocket support chat

1. Run `npm run ws`
2. Open page in two tabs — pretend one is customer, one is support agent
3. Messages appear in both tabs instantly
4. Explain: two-way — both sides send and receive
5. Compare with Example 1: when to pick SSE vs WebSocket

## Project structure

```
realtime-challenge-app/
  app/
    api/availability/stream/route.ts  ← SSE server
    components/
      AvailabilityBadge.tsx           ← Challenge 1 (SSE)
      SupportChat.tsx                 ← Challenge 2 (WebSocket)
    page.tsx
  scripts/ws-server.mjs
```

## Before class

Students can still fill in `REALTIME-PLAN.md` on paper first. Then run this project to see the plan in action.
