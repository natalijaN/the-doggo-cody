"use client";

import React, { useState } from "react";

interface Breed {
  breed: string;
  subBreeds: string[];
}

const BreedCard: React.FC<Breed> = ({ breed, subBreeds }) => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [randomBreedImage, setRandomBreedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="bg-white p-4 shadow rounded">
      <div
        onClick={() => handleBreedClick(breed)}
        className="text-xl font-semibold capitalize flex justify-between items-center"
      >
        <span className="text-lg text-gray-900 cursor-pointer">{breed}</span>
        <span className="text-sm text-gray-900">
          {subBreeds.length > 0 ? "( " + subBreeds.length + " subreeds)" : ""}
        </span>
      </div>

      {selectedBreed && isOpen && (
        <div className="mt-2 space-y-2">
          {randomBreedImage ? (
            <div>
              <img
                src={randomBreedImage}
                alt={selectedBreed}
                className="mt-4 w-full h-auto rounded-lg"
              />
            </div>
          ) : (
            <p>Loading image...</p>
          )}
          {subBreeds.length > 0 && (
            <>
              <h3 className="text-xl font-bold mb-6">SubBreeds</h3>
              <ul className="list-disc list-inside text-gray-700">
                {subBreeds.map((sub) => (
                  <li key={sub} className="capitalize">
                    {sub}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BreedCard;
