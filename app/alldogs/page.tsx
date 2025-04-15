"use client";
import React, { useEffect, useState } from "react";
import DogSearch from "../components/DogSearch/DogSearch";
import { useBreeds } from "../context/BreedContext";
import { IBreedApiResponse } from "../types/breed";

export default function DogsPage() {
  const { breeds, setRawBreeds } = useBreeds();
  const [timestamp, setTimestamp] = useState(() => new Date().toISOString());

  useEffect(() => {
    const fetchBreeds = async () => {
      const res = await fetch("https://dog.ceo/api/breeds/list/all", {
        next: { revalidate: 3600 },
      });
      const data: IBreedApiResponse = await res.json();
      setRawBreeds(data);
      setTimestamp(new Date().toISOString());
    };

    fetchBreeds();
  }, []);

  return (
    <div className="min-w-[700px] mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">🐶 Dog Breeds</h1>
      <p className="text-gray-700">{timestamp}</p>
      <DogSearch />
    </div>
  );
}
