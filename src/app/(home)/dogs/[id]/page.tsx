"use client";
import CardDetail from "@/src/components/Cards/CardDetail";
import { useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function DogFetcher({ params }: Props) {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPost = async (id: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/dogs/${id}`);
      if (!res.ok) throw new Error("Failed to fetch post");

      const data = await res.json();
      setPost(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost(params.id);
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Post Info</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {post && (
        <div className="mt-6">
          <CardDetail {...post} />
        </div>
      )}
    </div>
  );
}
