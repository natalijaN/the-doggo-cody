type Props = {
  setCurrentPage: (value: number | ((prev: number) => number)) => void;
  setSearchTerm: (value: string | ((prev: string) => string)) => void;
};

export default function Search({ setSearchTerm, setCurrentPage }: Props) {
  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Search breed..."
        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
      />
    </>
  );
}
