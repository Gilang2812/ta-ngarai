import React from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    if (onSearch) onSearch(query);
  };
  

  return (
    <form  onClick={handleSubmit}  className="relative">
      <div className="relative">
        <input
          type="text"
          name="query"
          placeholder="Cari..."
          className="w-full py-2 pl-4 pr-10 border border-gray-300  focus:border-primary/50 transition-ease-in-out rounded-full  focus:ring-4 focus:ring-primary/30   "
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
