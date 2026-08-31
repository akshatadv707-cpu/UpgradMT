import { AvailabilityBadge } from "./components/AvailabilityBadge";
import { SupportChat } from "./components/SupportChat";

export default function ChallengePage() {
  return (
    <main className="mx-auto max-w-3xl space-y-10 p-8">
      <header>
        <p className="text-sm font-medium text-green-700">F3 · Part 4 · Challenge</p>
        <h1 className="mt-1 text-3xl font-bold">Real-time feature demos</h1>
        <p className="mt-2 text-gray-600">
          Example 1 uses SSE (one-way). Example 2 uses WebSocket (two-way). See{" "}
          <code className="rounded bg-gray-100 px-1">REALTIME-PLAN-SOLUTION.md</code> for the
          written plan.
        </p>
      </header>

      <section>
        <h2 className="mb-2 text-xl font-semibold">
          Challenge example 1 — Live hotel availability (SSE)
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Each hotel listens to{" "}
          <code>/api/availability/stream?hotelId=...</code>. Count drops every 3 seconds
          (simulated bookings).
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <AvailabilityBadge hotelId="101" hotelName="Grand Plaza" />
          <AvailabilityBadge hotelId="202" hotelName="Seaside Inn" />
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-semibold">
          Challenge example 2 — Support chat (WebSocket)
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Terminal 2: <code className="rounded bg-gray-100 px-1">npm run ws</code>. Open two tabs
          — one as customer, one as agent.
        </p>
        <SupportChat ticketId="4521" />
      </section>
    </main>
  );
}
