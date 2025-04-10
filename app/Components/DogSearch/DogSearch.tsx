"use client";
import BreedCard from "@/app/alldogs/[breed]/page";
import React, { Suspense, useMemo, useState } from "react";

function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface DogSearchProps {
  breeds: [string, string[]][];
}

const ITEMS_PER_PAGE = 5;

const DogSearch = ({ breeds }: DogSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredList = useMemo(() => {
    return breeds.filter(([breed]) =>
      breed.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [breeds, searchTerm]);

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const currentItems = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // reset to page 1 on search
        }}
        placeholder="Search breed..."
        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
      />

      <ul className="grid gap-4">
        {currentItems.map(([breed, subBreeds]) => (
          <Suspense key={breed} fallback={<p>Loading {breed}...</p>}>
            <BreedCard
              key={breed}
              breed={capitalizeFirstLetter(breed)}
              subBreeds={subBreeds}
            />
          </Suspense>
        ))}
      </ul>

      {totalPages > 1 && (
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

      {filteredList.length === 0 && (
        <p className="text-center text-gray-500">
          No breeds match your search.
        </p>
      )}
    </div>
  );
};

export default DogSearch;
