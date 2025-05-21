import { IBreedApiResponse } from "../types/breed";

export async function getBreeds(): Promise<IBreedApiResponse> {
  const res = await fetch("https://dog.ceo/api/breeds/list/all", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dog breeds");
  }

  return res.json();
}
