"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import BreedCard from "../Cards/BreedCard";
import { useBreeds } from "@/app/context/BreedContext";
import { BreedItem, IBreedApiResponse } from "@/app/types/breed";

function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ITEMS_PER_PAGE = 5;

type DogSearchProps = {
  serverData: IBreedApiResponse;
};

const DogSearch = ({ serverData }: DogSearchProps) => {
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

  const totalPages =
    filteredList && Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const currentItems =
    filteredList &&
    filteredList.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages!) return;
    setCurrentPage(newPage);
  };

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
      <input
        type="text"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Search breed..."
        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
      />
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
      {totalPages! > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

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

export default DogSearch;
