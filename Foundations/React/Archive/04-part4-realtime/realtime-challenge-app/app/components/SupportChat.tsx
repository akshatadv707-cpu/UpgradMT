"use client";

import { useEffect, useRef, useState } from "react";

const WS_URL = "ws://localhost:3001";

export function SupportChat({ ticketId }: { ticketId: string }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      ws.send(`[Ticket #${ticketId}] Customer joined`);
    };
    ws.onclose = () => setConnected(false);
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => ws.close();
  }, [ticketId]);

  function send() {
    const text = input.trim();
    if (!text || wsRef.current?.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(`[Ticket #${ticketId}] ${text}`);
    setInput("");
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold">Support ticket #{ticketId}</h3>
      <p className="mb-3 text-sm text-gray-600">
        {connected ? (
          <span className="text-green-700">Agent chat connected</span>
        ) : (
          <span className="text-red-600">Run npm run ws in another terminal</span>
        )}
      </p>
      <ul className="mb-3 max-h-48 overflow-y-auto rounded bg-gray-50 p-3 text-sm">
        {messages.length === 0 ? (
          <li className="text-gray-400">No messages yet</li>
        ) : (
          messages.map((m, i) => <li key={i}>{m}</li>)
        )}
      </ul>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message support..."
          disabled={!connected}
        />
        <button
          type="button"
          onClick={send}
          disabled={!connected}
          className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          Send
        </button>
      </div>
    </div>
  );
}
