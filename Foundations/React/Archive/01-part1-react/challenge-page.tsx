// Challenge 1: Put React together
// Copy this into app/page.tsx
//
// Requires:
//   app/components/UserCard.tsx   ← 01-user-card.tsx
//   app/components/Counter.tsx  ← 03-counter.tsx
//   app/components/PostList.tsx ← 02-post-list.tsx

import { Counter } from "./components/Counter";
import { PostList } from "./components/PostList";
import { UserCard } from "./components/UserCard";

export default function Page() {
  return (
    <main>
      <h1>Dashboard</h1>

      <section>
        <h2>Team</h2>
        <UserCard name="Alice" role="Engineer" />
        <UserCard name="Bob" role="Designer" />
      </section>

      <section>
        <h2>Counter</h2>
        <Counter />
      </section>

      <section>
        <h2>Posts</h2>
        <PostList />
      </section>
    </main>
  );
}
