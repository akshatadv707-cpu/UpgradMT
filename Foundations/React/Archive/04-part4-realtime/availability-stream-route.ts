// Challenge solution — SSE availability API
// Save as: app/api/availability/stream/route.ts

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hotelId = searchParams.get("hotelId") ?? "1";

  const stream = new ReadableStream({
    start(controller) {
      let roomsLeft = 5;

      const send = () => {
        const payload = JSON.stringify({ hotelId, roomsLeft });
        controller.enqueue(new TextEncoder().encode(`data: ${payload}\n\n`));
      };

      send();
      const interval = setInterval(() => {
        if (roomsLeft <= 0) {
          clearInterval(interval);
          controller.close();
          return;
        }
        roomsLeft -= 1;
        send();
      }, 3000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
