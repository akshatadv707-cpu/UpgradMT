import { WebSocketServer } from "ws";

const PORT = 3001;
const wss = new WebSocketServer({ port: PORT });
const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.send("Connected to F3 challenge support chat.");

  ws.on("message", (data) => {
    const text = data.toString();
    for (const client of clients) {
      if (client.readyState === 1) client.send(text);
    }
  });

  ws.on("close", () => clients.delete(ws));
});

console.log(`WebSocket server on ws://localhost:${PORT}`);
