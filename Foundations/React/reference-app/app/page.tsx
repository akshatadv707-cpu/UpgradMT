import { AddButton } from "./components/AddButton";
import { Counter } from "./components/Counter";
import { Greeting } from "./components/Greeting";
import { PostList } from "./components/PostList";
import { ProductCard } from "./components/ProductCard";
import { UserCard } from "./components/UserCard";

// Part 2 practice: Server Component page (default — no 'use client')
export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">F3 Practice Dashboard</h1>
      <Greeting />

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Products</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <ProductCard name="Keyboard" price={79} />
          <ProductCard name="Mouse" price={29} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Counter (Client)</h2>
        <Counter />
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Posts (useEffect)</h2>
        <PostList />
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Part 1 challenge — dashboard</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <UserCard name="Alice" role="Engineer" />
          <UserCard name="Bob" role="Designer" />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Server + Client together</h2>
        <p className="mb-2">This text is rendered on the server.</p>
        <AddButton />
      </section>
    </main>
  );
}
