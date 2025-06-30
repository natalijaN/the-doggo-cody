"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { uploadAndClassifyImage } from "../actions/uploadAndClassifyImage";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Force an error as soon as the component mounts
  //   useEffect(() => {
  //     throw new Error("This is a forced error to test error.js!");
  //   }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log("File selected:", selectedFile);
      console.log("File name:", selectedFile.name);
      console.log("File size:", selectedFile.size, "bytes");
      console.log("File type:", selectedFile.type);
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    startTransition(async () => {
      const response = await uploadAndClassifyImage(formData);
      if (response?.error) {
        console.error("Error:", response.error);
      } else {
        setResult(response?.breed || "Unknown");
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded shadow bg-white">
      <h2 className="flex justify-center items-center text-2xl font-bold mb-4">
        Upload a Dog Photo
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="image">Choose image:</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isPending}
          className={`border rounded px-3 py-2`}
        />

        {previewUrl && (
          <div className="flex justify-center items-center">
            <Image
              src={previewUrl}
              alt="Preview"
              width={300}
              height={300}
              className="rounded"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isPending || !file}
          className="px-4 py-2 mb-4 bg-red-700 text-white rounded hover:bg-red-900 disabled:opacity-50"
        >
          {isPending ? "Classifying..." : "Classify Breed"}
        </button>
      </form>

      {result && (
        <div className="mt-6 text-lg font-medium text-center text-green-700">
          Predicted Breed: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}
