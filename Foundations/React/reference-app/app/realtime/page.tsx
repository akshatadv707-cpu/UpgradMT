import { AvailabilityBadge } from "../components/AvailabilityBadge";
import { ChatBox } from "../components/ChatBox";
import { OrderStatusStream } from "../components/OrderStatusStream";

export default function RealtimePage() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 p-8">
      <div>
        <h1 className="text-3xl font-bold">Part 4 — Real-time demos</h1>
        <p className="mt-2 text-gray-600">
          Practice 1: SSE order status. Practice 2: WebSocket chat (needs{" "}
          <code className="rounded bg-gray-100 px-1">npm run ws</code> in another terminal).
          Challenge: live availability badges.
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Practice 1 — SSE (one-way)</h2>
        <p className="mb-2 text-sm text-gray-600">
          EventSource opens <code>/api/orders/stream</code>. Status updates every 2 seconds.
        </p>
        <OrderStatusStream />
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Practice 2 — WebSocket chat (two-way)</h2>
        <ChatBox />
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Challenge — Live availability (SSE)</h2>
        <p className="mb-3 text-sm text-gray-600">
          Each badge listens to <code>/api/availability/stream?hotelId=...</code>. Count drops
          when another &quot;guest&quot; books (simulated every 3s).
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <AvailabilityBadge hotelId="101" hotelName="Grand Plaza" />
          <AvailabilityBadge hotelId="202" hotelName="Seaside Inn" />
        </div>
      </section>
    </main>
  );
}
