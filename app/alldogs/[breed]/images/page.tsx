"use client";
import PreviewLightbox from "@/app/components/Image/ImageCarousel";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    breed: string;
  };
}
const BreedImages = ({ params }: Props) => {
  const [breedImages, setBreedImages] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `https://dog.ceo/api/breed/${params.breed.toLowerCase()}/images`
        );
        const data = await res.json();

        setBreedImages(data.message);
      } catch (error) {
        console.error("Error fetching breed image:", error);
        setBreedImages(null);
      }
    };
    fetchImages();
  }, []);

  const goBack = () => {
    router.back();
  };
  return (
    <div>
      {" "}
      <h1 className="text-2xl font-bold mb-4">Breed Gallery</h1>
      {breedImages && (
        <div className="flex justify-center items-center flex-col">
          <p className="mb-6">Click on the image to preview more images</p>
          <PreviewLightbox breedImages={breedImages} />
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
        >
          Go Back to Breed Details
        </button>
      </div>
    </div>
  );
};

export default BreedImages;
