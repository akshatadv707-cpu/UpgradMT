// Challenge 3: Styled layout with nav
// Copy this into app/layout.tsx

import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <nav className="border-b border-gray-200 bg-white px-6 py-3">
          <div className="mx-auto flex max-w-4xl gap-4">
            <Link href="/" className="font-medium text-blue-600 hover:underline">
              Home
            </Link>
            <Link href="/about" className="font-medium text-blue-600 hover:underline">
              About
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
