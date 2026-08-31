import "./globals.css";

export const metadata = {
  title: "F3 Part 4 Challenge — Real-time",
  description: "SSE hotel availability + WebSocket support chat",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
