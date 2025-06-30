import { getBreeds } from "@/src/lib/fetchBreeds";
import { IBreedApiResponse } from "@/src/types/breed";
import dynamic from "next/dynamic";
const DogList = dynamic(() => import("@/src/components/DogList"), {
  ssr: false,
});

export default async function DogsPage() {
  const data: IBreedApiResponse = await getBreeds();
  const timestamp = new Date().toISOString();

  return (
    <div className="min-w-[700px] mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">🐶 Dog Breeds</h1>
      <p className="text-gray-700">Server fetched at: {timestamp}</p>
      <DogList serverData={data} />
    </div>
  );
}
