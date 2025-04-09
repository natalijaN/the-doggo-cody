"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string;
}

const CardDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/dogs/${id}`);
        if (response.ok) {
          const data: Post = await response.json();
          setData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const goBack = () => {
    router.back();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data && (
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-gray-800">{data.title}</h1>
          <p className="text-gray-600 mt-4">{data.content}</p>

          <div className="mt-6">
            <button
              onClick={goBack}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
            >
              Go Back to All Posts
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
