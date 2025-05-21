"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useBreeds } from "@/src/context/BreedContext";

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
      <h1 className="text-2xl font-bold mb-4">Breed Information</h1>
      {breedImages && (
        <Image
          src={breedImages[0]}
          alt="Breed image"
          style={{ objectFit: "cover" }}
          width={300}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg"
        />
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
      <div className="flex justify-center align-middle mt-6">
        <div className="mr-2">
          <button
            onClick={goBack}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
          >
            Go Back to All Dogs
          </button>
        </div>
        <Link href={`/alldogs/${params.breed.toLowerCase()}/images`}>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700">
            View all dog images
          </button>
        </Link>
      </div>
    </div>
  );
}
