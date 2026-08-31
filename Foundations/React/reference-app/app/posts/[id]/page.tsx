import Link from "next/link";

type Post = { id: number; title: string; body: string };

// Part 2 challenge: dynamic route + server fetch
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
    <main className="mx-auto max-w-4xl p-8">
      <Link href="/" className="text-blue-600 hover:underline">
        Back to home
      </Link>
      <h1 className="mt-4 text-2xl font-bold">{post.title}</h1>
      <p className="mt-4 text-gray-700">{post.body}</p>
    </main>
  );
}
