import { BreedItem, IBreedApiResponse } from "../types/breed";

const ITEMS_PER_PAGE = 5;
type Props = {
  items: BreedItem[];
  currentPage: number;
  setCurrentPage: (value: number | ((prev: number) => number)) => void;
};

export default function Pagination({
  items,
  currentPage,
  setCurrentPage,
}: Props) {
  const totalPages = items && Math.ceil(items.length / ITEMS_PER_PAGE);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages!) return;
    setCurrentPage(newPage);
  };

  return (
    <>
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
    </>
  );
}
