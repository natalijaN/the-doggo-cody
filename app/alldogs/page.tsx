import DogSearch from "../components/DogSearch/DogSearch";
import { getBreeds } from "../lib/fetchBreeds";
import { IBreedApiResponse } from "../types/breed";

export default async function DogsPage() {
  const data: IBreedApiResponse = await getBreeds();
  const timestamp = new Date().toISOString();

  return (
    <div className="min-w-[700px] mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">🐶 Dog Breeds</h1>
      <p className="text-gray-700">Server fetched at: {timestamp}</p>
      <DogSearch serverData={data} />
    </div>
  );
}
