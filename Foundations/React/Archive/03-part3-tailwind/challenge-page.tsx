// Challenge 3: Style your dashboard
// Copy this into app/page.tsx
//
// Requires:
//   app/components/UserCard.tsx ← 01-user-card.tsx
//   app/components/Counter.tsx  ← 02-counter.tsx
//   app/components/PostList.tsx ← from Challenge 1 or practice-solutions
//   app/layout.tsx              ← 03-layout.tsx

import { Counter } from "./components/Counter";
import { PostList } from "./components/PostList";
import { UserCard } from "./components/UserCard";

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Team</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <UserCard name="Alice" role="Engineer" />
          <UserCard name="Bob" role="Designer" />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Counter</h2>
        <Counter />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Posts</h2>
        <PostList />
      </section>
    </main>
  );
}
