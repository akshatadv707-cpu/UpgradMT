# Part 4 challenge solution — Example 2: Support chat (Socket.io)

**Challenge:** Plan a real-time feature — **two-way** example.

Use this when discussing why chat needs WebSockets, not SSE.

---

## Feature name

In-app customer support chat

## One-sentence description

Logged-in users send messages to a support agent and receive replies in real time without refreshing the page.

## SSE or Socket.io?

- [ ] SSE (one-way: server → client)
- [x] Socket.io / WebSockets (two-way)

## Why this choice?

Both the **customer** and the **agent** send messages frequently. SSE only pushes server → browser; the customer would need separate HTTP POST requests for each message, which is clunky and higher latency. Socket.io gives a persistent two-way channel plus rooms (one room per ticket).

## Who sends / who receives?

| Actor | Sends | Receives |
|-------|-------|----------|
| Browser (customer) | `chat:message` with `{ ticketId, text, from: "user" }` | `chat:message` from agent, `chat:typing` |
| Browser (agent dashboard) | `chat:message` with `{ ticketId, text, from: "agent" }` | `chat:message` from user |
| Server (Socket.io) | Broadcasts messages to the correct room | Messages from all clients; may persist to database |

## Event names (sketch)

| Event name | Direction | Payload shape |
|------------|-----------|---------------|
| `join:room` | client → server | `{ ticketId: string }` |
| `chat:message` | both ways | `{ ticketId, text, from, sentAt }` |
| `chat:typing` | client → server → other clients | `{ ticketId, from }` |

## Components involved

| Component / file | Type | Role |
|------------------|------|------|
| `ChatWindow.tsx` | Client | `socket.emit` on send, `socket.on` to append messages, `useState` for message list |
| `socket-server.ts` | Node / custom server | Socket.io `io.on("connection")`, join rooms by `ticketId` |
| `SupportTicketPage.tsx` | Server page shell | Renders layout; imports `ChatWindow` client component |

## Data flow (step by step)

1. User opens support page for ticket `#4521`.
2. `ChatWindow` connects: `io()` and emits `join:room` with `ticketId`.
3. User types "Where is my order?" → `emit("chat:message", ...)`.
4. Server saves to DB and broadcasts to everyone in room `#4521` (user + agent).
5. Agent's screen updates instantly. Agent replies → same event name, reverse direction.

## Questions for Session 5

1. Where does the Socket.io server run alongside Next.js?
2. How do we authenticate users before joining a chat room?

---

## Line-by-line: ChatWindow (sketch)

```tsx
"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type Message = { text: string; from: "user" | "agent" };

export function ChatWindow({ ticketId }: { ticketId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket: Socket = io();

    socket.emit("join:room", { ticketId });

    socket.on("chat:message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, [ticketId]);

  function send() {
    // socket.emit("chat:message", { ticketId, text: input, from: "user" });
    setInput("");
  }

  return (/* message list + input + send button */);
}
```

| Line | What it does |
|------|----------------|
| `io()` | Connect to Socket.io server. |
| `emit("join:room", ...)` | Tell server which ticket room to join. |
| `on("chat:message", ...)` | Append every incoming message to state. |
| `disconnect()` on cleanup | Leave room when user navigates away. |
