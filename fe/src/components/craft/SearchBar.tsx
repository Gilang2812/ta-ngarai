import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { DetailCraftUserResponse } from "@/type/schema/DetailCraftSchema";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  crafts: DetailCraftUserResponse[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, crafts }) => {
  const [query, setQuery] = useState<string>("");
  const result = useMemo(
    () =>
      crafts?.filter(
        (craft) =>
          craft.variant.name
            .toLowerCase()
            .trim()
            .includes(query.toLowerCase()) ||
          craft.variant.craft.name
            .toLowerCase()
            .trim()
            .includes(query.toLowerCase())
      ),
    [crafts, query]
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative z-50">
      <div className="relative z-50 font-normal">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() =>
            setTimeout(() => {
              setQuery("");
            }, 500)
          }
          type="text"
          autoComplete="off"
          name="query"
          placeholder="Cari..."
          className="w-full py-2 pl-4 pr-10 border border-gray-300  focus:border-primary/50 transition-ease-in-out rounded-full  focus:ring-4 focus:ring-primary/30"
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

        <AnimatePresence>
          {query && (
            <div className="relative z-50">
              <motion.div
                layout
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bg-white w-full border rounded-xl z-50 max-h-[464px] overflow-x-hidden"
              >
                <motion.div layout className="p-3">
                  {result && result.length === 0 ? (
                    <p>nothings found</p>
                  ) : (
                    result?.map((rs, index) => (
                      <Link
                        aria-label={`Lihat detail produk ${rs.variant.name}`}
                        href={`/web/craft/${rs.variant.id_craft}/${rs.id_souvenir_place}?idvr=${rs.craft_variant_id}`}
                        key={index}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="block px-4 py-2 hover:bg-gray-100 text-sm text-black"
                      >
                        {rs.variant.craft.name} {rs.variant.name}
                      </Link>
                    ))
                  )}
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};
