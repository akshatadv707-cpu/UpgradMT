// Practice 1: SSE — order status stream (one-way server → browser)

const STATUSES = [
  "Order placed",
  "Preparing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

export async function GET(request: Request) {
  const stream = new ReadableStream({
    start(controller) {
      let index = 0;

      const send = () => {
        const payload = JSON.stringify({ status: STATUSES[index] });
        controller.enqueue(new TextEncoder().encode(`data: ${payload}\n\n`));
        index += 1;
      };

      send();
      const interval = setInterval(() => {
        if (index >= STATUSES.length) {
          clearInterval(interval);
          controller.close();
          return;
        }
        send();
      }, 2000);

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
