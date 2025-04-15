"use client";

import PreviewLightbox from "@/app/components/Image/ImageCarousel";
import { useBreeds } from "@/app/context/BreedContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    breed: string;
  };
}

export default function BreedPage({ params }: Props) {
  const [breedImages, setBreedImages] = useState(null);
  const [subBreeds, setSubBreeds] = useState<string[]>();
  const { breeds } = useBreeds();
  const router = useRouter();
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `https://dog.ceo/api/breed/${params.breed.toLowerCase()}/images`
        );
        const data = await res.json();

        setBreedImages(data.message);
        const selectedBreed = breeds.filter((breed) => {
          return breed.breed === params.breed.toLowerCase();
        });
        setSubBreeds(selectedBreed[0].subBreeds);
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
    <div className="p-4 flex justify-center items-center flex-col">
      <h1 className="text-2xl font-bold mb-4">Breed Gallery</h1>
      {breedImages && (
        <div className="flex justify-center items-center flex-col">
          <p className="mb-6">Click on the image to preview more images</p>
          <PreviewLightbox breedImages={breedImages} />
        </div>
      )}

      {subBreeds && subBreeds?.length > 0 && (
        <>
          <p className="mt-6">SubBreeds: </p>
          <ul className="list-disc list-inside text-gray-700">
            {subBreeds.map((sub) => (
              <li key={sub} className="capitalize">
                {sub}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-6">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
        >
          Go Back to All Dogs
        </button>
      </div>
    </div>
  );
}
