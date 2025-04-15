export type IBreedApiResponse = {
    message: {
      [breed: string]: string[];
    };
    status: string;
};
  
export type BreedItem = {
    breed: string;
    subBreeds: string[];
};
  
export type BreedContextType = {
    breeds: BreedItem[];
    setRawBreeds: (data: IBreedApiResponse) => void;
};