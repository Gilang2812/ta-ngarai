import React from "react"; 

type Props = {
  itemsPerPage: number;
  handleItemsPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void; 
};

const TableManagementHeader = ({
  itemsPerPage = 5,
  handleItemsPerPage,
  searchTerm,
  handleSearch, 
}: Props) => {
  return (
    <header className="flex justify-between w-full mb-4">
      <label htmlFor="entries" className="font-semibold">
        Show&nbsp;
        <select
          name="entries"
          id="entries"
          className="p-1 !border rounded !border-slate-400 focus:outline-none ring-0 focus:border focus:ring-4 transition-ease-in-out focus:ring-primary/30 "
          value={itemsPerPage}
          onChange={handleItemsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        &nbsp;entries
      </label>

      <label
        htmlFor=""
        className=" [&_svg]:text-transparent [&_svg]:focus-within:text-slate-500 rounded border p-2 flex items-center justify-between  "
      >
        <input
          type="search"
          placeholder="Search"
          className=" focus:outline-none border-none !ring-0 border-0  p-0 "
          value={searchTerm}
          onChange={handleSearch}
          aria-label="Search packages"
        />
      </label>
    </header>
  );
};

export default TableManagementHeader;
