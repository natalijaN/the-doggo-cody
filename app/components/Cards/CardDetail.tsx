"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string;
}
const CardDetail = (data: Post) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
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
