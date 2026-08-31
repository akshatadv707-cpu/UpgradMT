// Challenge 2: Home page — Server Component that fetches a list
// Copy this into app/page.tsx
//
// Requires:
//   app/components/AddButton.tsx ← 03-add-button.tsx
//   app/posts/[id]/page.tsx      ← 02-post-detail-page.tsx
//   app/layout.tsx               ← 04-layout.tsx

import Link from "next/link";
import { AddButton } from "./components/AddButton";

type Post = { id: number; title: string };

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <p>This list was fetched on the server. The button below is a Client Component.</p>
      <AddButton />
    </main>
  );
}
