"use client";

import { useEffect, useRef, useState } from "react";

const WS_URL = "ws://localhost:3001";

export function ChatBox() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => ws.close();
  }, []);

  function send() {
    const text = input.trim();
    if (!text || wsRef.current?.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(text);
    setInput("");
  }

  return (
    <div className="rounded border border-gray-200 bg-white p-4">
      <p className="mb-2 text-sm text-gray-600">
        {connected
          ? "Connected to WebSocket server (port 3001). Open two browser tabs to test."
          : "Not connected — run npm run ws in a second terminal."}
      </p>
      <ul className="mb-3 max-h-40 overflow-y-auto rounded bg-gray-50 p-2 text-sm">
        {messages.length === 0 ? (
          <li className="text-gray-400">No messages yet</li>
        ) : (
          messages.map((msg, i) => <li key={i}>{msg}</li>)
        )}
      </ul>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message"
          disabled={!connected}
        />
        <button
          type="button"
          onClick={send}
          disabled={!connected}
          className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          Send
        </button>
      </div>
    </div>
  );
}
