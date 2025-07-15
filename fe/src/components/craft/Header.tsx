
import { SearchBar } from "./SearchBar";
import {  DetailCraftUserResponse } from "@/type/schema/DetailCraftSchema";

interface HeaderProps {
  onSearch?: (query: string) => void;
  crafts: DetailCraftUserResponse[];
}

export const Header: React.FC<HeaderProps> = ({ onSearch, crafts }) => {
  return (
    <header className="flex sticky gap-4  items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Souvenir</h1>
      <div className="flex items-center space-x-4">
        <SearchBar crafts={crafts} onSearch={onSearch} />
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};
