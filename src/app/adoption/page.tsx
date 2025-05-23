"use client";

import { usePosts } from "@/src/hooks/usePosts";

export default function AdoptionPage() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div className="bg-white rounded-lg px-40 py-10">
      <ul className="space-y-2">
        {posts?.map((post) => (
          <li key={post.id} className="font-semibold p-4 border rounded">
            <p className="text-sm text-gray-700">Breed: {post.breed}</p>
            <p>Title: {post.title}</p>
            <p>Description: {post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
