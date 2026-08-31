// Challenge solution — WebSocket support chat (runnable)
// Save as: app/components/SupportChat.tsx
// Requires ws-server from practice-solutions/04-part4-realtime/04-ws-server.mjs

"use client";

import { useEffect, useRef, useState } from "react";

const WS_URL = "ws://localhost:3001";

export function SupportChat({ ticketId }: { ticketId: string }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(`[${ticketId}] joined the chat`);
    };
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => ws.close();
  }, [ticketId]);

  function send() {
    const text = input.trim();
    if (!text || wsRef.current?.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(`[${ticketId}] ${text}`);
    setInput("");
  }

  return (
    <div className="rounded border p-4">
      <h3 className="font-semibold">Support ticket #{ticketId}</h3>
      <ul className="my-2 max-h-32 overflow-y-auto text-sm">
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-2 py-1 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message support..."
        />
        <button type="button" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
