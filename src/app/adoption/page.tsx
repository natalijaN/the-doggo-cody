"use client";

import { deletePost } from "@/src/actions/mutatePosts";
import Modal from "@/src/components/Modal";
import UpdatePostForm from "@/src/components/UpdatePostForm";
import { usePosts } from "@/src/hooks/usePosts";
import { Post } from "@/src/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function AdoptionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePost, setActivePost] = useState<Post>();
  const { data: posts, isLoading, error } = usePosts();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post updated!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });
  const handleEditPost = (post: Post) => {
    setActivePost(post);
    setIsModalOpen(true);
  };

  const handleDeletePost = (id: string) => {
    mutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div className="bg-white rounded-lg px-40 py-10">
      <ul className="space-y-2">
        {posts?.map((post) => (
          <li key={post.id} className="font-semibold p-4 border rounded">
            <div className="flex justify-between">
              <p className="text-sm text-gray-700">Breed: {post.breed}</p>
              <div className="flex gap-2">
                <button
                  className="text-sm bg-gray-200 rounded-xl p-3"
                  onClick={() => handleEditPost(post)}
                >
                  Edit Post
                </button>
                <button
                  className="text-sm bg-gray-200 rounded-xl p-3"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete Post
                </button>
              </div>
            </div>
            <p>Title: {post.title}</p>
            <p>Description: {post.description}</p>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <UpdatePostForm
            post={activePost}
            onSuccess={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
