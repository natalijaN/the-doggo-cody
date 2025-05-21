"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { BreedContextType, BreedItem, IBreedApiResponse } from "../types/breed";

export const BreedContext = createContext<BreedContextType | null>(null);

export const BreedProvider = ({ children }: { children: ReactNode }) => {
  const [breeds, setBreeds] = useState<BreedItem[]>([]);

  const setRawBreeds = (data: IBreedApiResponse) => {
    const transformed: BreedItem[] = Object.entries(data.message).map(
      ([breed, subBreeds]) => ({
        breed,
        subBreeds,
      })
    );
    setBreeds(transformed);
  };

  return (
    <BreedContext.Provider value={{ breeds, setRawBreeds }}>
      {children}
    </BreedContext.Provider>
  );
};

export const useBreeds = () => {
  const context = useContext(BreedContext);
  if (!context) {
    throw new Error("useBreeds must be used within a BreedProvider");
  }
  return context;
};
