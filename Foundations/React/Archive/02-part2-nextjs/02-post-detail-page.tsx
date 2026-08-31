// Challenge 2: Dynamic route — post detail page
// Save as: app/posts/[id]/page.tsx
// Create folders: app → posts → [id] → page.tsx
// Try: http://localhost:3000/posts/1

import Link from "next/link";

type Post = { id: number; title: string; body: string };

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Post not found");
  return res.json();
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <main>
      <Link href="/">Back to home</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
}
