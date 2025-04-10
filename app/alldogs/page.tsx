import React from "react";
import DogSearch from "../Components/DogSearch/DogSearch";

type DogApiResponse = {
  message: {
    [breed: string]: string[];
  };
  status: string;
};

export default async function DogsPage() {
  const res = await fetch("https://dog.ceo/api/breeds/list/all");
  const data: DogApiResponse = await res.json();

  const breeds = Object.entries(data.message);

  return (
    <div className="max-w-6 min-w-96 mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">🐶 Dog Breeds</h1>
      <DogSearch breeds={breeds} />
    </div>
  );
}
