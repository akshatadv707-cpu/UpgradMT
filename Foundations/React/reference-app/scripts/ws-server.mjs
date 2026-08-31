/**
 * Practice 2: tiny WebSocket server for chat demo.
 * Run: npm run ws   (keep running in a second terminal while npm run dev)
 */
import { WebSocketServer } from "ws";

const PORT = 3001;
const wss = new WebSocketServer({ port: PORT });
const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.send("Connected to F3 chat demo. Messages broadcast to all tabs.");

  ws.on("message", (data) => {
    const text = data.toString();
    for (const client of clients) {
      if (client.readyState === 1) {
        client.send(text);
      }
    }
  });

  ws.on("close", () => clients.delete(ws));
});

console.log(`WebSocket server listening on ws://localhost:${PORT}`);
