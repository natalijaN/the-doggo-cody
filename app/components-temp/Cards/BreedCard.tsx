"use client";

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

interface Breed {
  breed: string;
  subBreeds: string[];
}

const BreedCard: React.FC<Breed> = ({ breed, subBreeds }) => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [randomBreedImage, setRandomBreedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setFavorites] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favorites.includes(breed));
  }, [breed]);

  const handleBreedClick = async (breed: string) => {
    setIsOpen(!isOpen);
    setSelectedBreed(breed.toLowerCase());

    if (isOpen) {
      return;
    }
    try {
      const res = await fetch(
        `https://dog.ceo/api/breed/${breed.toLowerCase()}/images`
      );
      const data = await res.json();

      setRandomBreedImage(data.message[0]);
    } catch (error) {
      console.error("Error fetching breed image:", error);
      setRandomBreedImage(null);
    }
  };

  const handleHeartClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorites.includes(breed)) {
      const updated = favorites.filter((b: string) => b !== breed);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setFavorites(false);
    } else {
      favorites.push(breed);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setFavorites(true);
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <div
        onClick={() => handleBreedClick(breed)}
        className="text-xl font-semibold capitalize flex justify-between items-center"
      >
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-900 cursor-pointer">
              {breed}
            </span>
            <span className="text-sm text-gray-900">
              {subBreeds.length > 0
                ? "( " + subBreeds.length + " subreeds)"
                : ""}
            </span>
          </div>
          <button className=" text-red-600">
            <Heart
              onClick={handleHeartClick}
              fill={isFavorite ? "red" : "none"}
            />
          </button>
        </div>
      </div>

      {selectedBreed && isOpen && (
        <div className="mt-2 space-y-2 flex justify-center items-center flex-col">
          {randomBreedImage ? (
            <div>
              <Image
                src={randomBreedImage}
                alt={selectedBreed}
                style={{ objectFit: "cover" }}
                width={200}
                height={150}
                className="mt-4 w-full h-auto "
              />
            </div>
          ) : (
            <p>Loading image...</p>
          )}
          <div className="w-1/4 ">
            <Button type="button">
              <Link
                className=""
                href={`/alldogs/${selectedBreed.toLowerCase()}`}
              >
                View more
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreedCard;
