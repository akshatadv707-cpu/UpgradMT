import "./globals.css";

export const metadata = {
  title: "Movie Tracker Lab, Module 3",
  description:
    "Hands-on App Router lab: routing, boundaries, caching, streaming",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <header className="sticky top-0 z-10 border-b border-black/10 bg-neutral-50/80 px-6 py-4 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <a href="/" className="text-base font-semibold tracking-tight">
              🎬 Movie Tracker
            </a>
            <nav className="flex gap-5 text-sm text-neutral-600 dark:text-neutral-400">
              <a
                className="transition hover:text-neutral-900 dark:hover:text-neutral-100"
                href="/"
              >
                Home
              </a>
              <a
                className="transition hover:text-neutral-900 dark:hover:text-neutral-100"
                href="/titles/nebula-drift"
              >
                Nebula Drift
              </a>
              <a
                className="transition hover:text-neutral-900 dark:hover:text-neutral-100"
                href="/titles/missing"
              >
                Missing title
              </a>
              <a
                className="transition hover:text-neutral-900 dark:hover:text-neutral-100"
                href="/titles/missing-reel"
              >
                Lost reel
              </a>
              <a
                className="transition hover:text-neutral-900 dark:hover:text-neutral-100"
                href="/stats"
              >
                Stats
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
