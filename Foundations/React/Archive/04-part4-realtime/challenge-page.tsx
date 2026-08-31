// Challenge solution — demo page combining both challenge examples
// Save as: app/realtime/challenge/page.tsx  OR add section to app/realtime/page.tsx

import { AvailabilityBadge } from "../../components/AvailabilityBadge";
import { SupportChat } from "../../components/SupportChat";

export default function RealtimeChallengePage() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 p-8">
      <h1 className="text-3xl font-bold">Challenge solutions — real-time</h1>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Example 1 — SSE: live availability</h2>
        <p className="mb-3 text-sm text-gray-600">
          See REALTIME-PLAN-SOLUTION.md for the written plan. This is the runnable version.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <AvailabilityBadge hotelId="101" hotelName="Grand Plaza" />
          <AvailabilityBadge hotelId="202" hotelName="Seaside Inn" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Example 2 — WebSocket: support chat</h2>
        <p className="mb-3 text-sm text-gray-600">
          Run npm run ws in a second terminal. See REALTIME-PLAN-SOLUTION-chat.md for the plan.
        </p>
        <SupportChat ticketId="4521" />
      </section>
    </main>
  );
}
