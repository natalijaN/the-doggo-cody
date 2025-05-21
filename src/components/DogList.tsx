"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { BreedItem, IBreedApiResponse } from "@/src/types/breed";
import { useBreeds } from "@/src/context/BreedContext";
import Pagination from "@/src/utils/pagination";
import Search from "./Search";
import BreedCard from "./Cards/BreedCard";

const ITEMS_PER_PAGE = 5;

type DogSearchProps = {
  serverData: IBreedApiResponse;
};

function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const DogList = ({ serverData }: DogSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFavourites, setShowFavourites] = useState(false);
  const [localItems, setLocalItems] = useState<BreedItem[]>();
  const [refreshKey, setRefreshKey] = useState(0);
  const { breeds, setRawBreeds } = useBreeds();

  useEffect(() => {
    setRawBreeds(serverData);
  }, [serverData]);

  useEffect(() => {
    setLocalItems(breeds);
  }, [breeds]);

  const filteredList = useMemo(() => {
    return (
      localItems &&
      localItems.filter((breed) =>
        breed.breed.includes(searchTerm.toLowerCase())
      )
    );
  }, [localItems, searchTerm]);

  const currentItems =
    filteredList &&
    filteredList.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const handleShowingFavourites = () => {
    const favorites = JSON.parse(
      localStorage.getItem("favorites")?.toLowerCase() || "[]"
    );
    if (showFavourites) {
      setLocalItems(breeds);
    } else {
      const updatedFavourites = breeds.filter((item) => {
        return favorites.includes(item.breed);
      });
      setLocalItems(updatedFavourites);
    }
    setCurrentPage(1);
    setShowFavourites(!showFavourites);
  };

  const handleRemoveFavorites = () => {
    localStorage.removeItem("favorites");
    setRefreshKey((prev) => prev + 1);
    setLocalItems(breeds);
    setCurrentPage(1);
    setShowFavourites(false);
  };

  return (
    <div className="space-y-4">
      <Search setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
      <div className="flex justify-around ">
        <button
          onClick={handleShowingFavourites}
          className="px-4 py-2 mb-4 bg-red-700 text-white rounded hover:bg-red-900 disabled:opacity-50"
        >
          Show Only Favorites
        </button>

        <button
          onClick={handleRemoveFavorites}
          className="px-4 py-2 mb-4 bg-red-700 text-white rounded hover:bg-red-900 disabled:opacity-50"
        >
          Remove All Favorites
        </button>
      </div>
      <ul className="grid gap-4">
        {currentItems &&
          currentItems.map((item) => (
            <Suspense
              key={item.breed}
              fallback={<p>Loading {item.breed}...</p>}
            >
              <BreedCard
                breed={capitalizeFirstLetter(item.breed)}
                subBreeds={item.subBreeds}
                key={refreshKey}
              />
            </Suspense>
          ))}
      </ul>

      <Pagination
        items={filteredList!}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {showFavourites && filteredList!.length === 0 ? (
        <p className="text-center text-gray-500">
          No favorites breeds selected.
        </p>
      ) : (
        filteredList &&
        filteredList.length === 0 && (
          <p className="text-center text-gray-500">
            No breeds match your search.
          </p>
        )
      )}
    </div>
  );
};

export default DogList;
