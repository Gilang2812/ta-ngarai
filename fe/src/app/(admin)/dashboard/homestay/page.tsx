"use client";
import { NextPage } from "next";
import { useState, useMemo } from "react";
import { FaTrash, FaPlus, FaCircleInfo } from "react-icons/fa6";

interface Props {}

const Homestay: NextPage<Props> = ({}) => {
  const data = useMemo(
    () => [
      { id: "P0025", name: "1 Day Sumpu Trip", status: "homestay" },
      { id: "P0026", name: "1 Day Sumpu Trip", status: "homestay" },
      { id: "P0027", name: "1 Day Sumpu Trip", status: "homestay" },
      { id: "P0028", name: "1 Day Sumpu Trip", status: "homestay" },
      { id: "P0029", name: "1 Day Sumpu Trip", status: "homestay" },
      // Tambahkan lebih banyak data jika diperlukan
    ],
    []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <main className="p-5 bg-white rounded-xl">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-lg capitalize">Manage Homestay</h1>
        <a
          className="flex items-center gap-3 px-3 py-2 font-normal text-white rounded bg-customBlue hover:bg-customBg"
          href="#"
        >
          <FaPlus /> New Homestay
        </a>
      </header>

      <section aria-labelledby="data-table-section">
        <div className="flex justify-between w-full mb-4">
          <label htmlFor="entries" className="font-semibold">
            Show &nbsp;
            <select
              name="entries"
              id="entries"
              className="p-1 border rounded border-slate-400"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            &nbsp; entries
          </label>
          <input
            type="text"
            placeholder="Search"
            className="p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search homestay"
          />
        </div>

        <h2 id="data-table-section" className="sr-only">
          Homestay Data Table
        </h2>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Status</th>
              <th className="py-2 text-center w-[138px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="py-2 text-center">{indexOfFirstItem + index + 1}</td>
                <td className="py-2 text-center">{item.id}</td>
                <td className="py-2 text-center">{item.name}</td>
                <td className="py-2 text-center">{item.status}</td>
                <td className="flex justify-center gap-4 py-2">
                  <button
                    className="p-3 capitalize transition duration-300 ease-linear bg-white border rounded text-customBlue border-customBlue hover:bg-customBlue hover:text-white"
                    aria-label="View Homestay Info"
                  >
                    <FaCircleInfo />
                  </button>
                  <button
                    className="p-3 text-red-500 transition duration-300 ease-linear bg-white border border-red-500 rounded hover:bg-red-500 hover:text-white"
                    aria-label="Delete Homestay"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <nav
        aria-label="Pagination"
        className="flex items-center justify-between mt-4"
      >
        <div>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 transition duration-200 ease-linear bg-gray-300 rounded hover:bg-gray-500 disabled:opacity-50"
            aria-label="Previous Page"
          >
            Previous
          </button>
          <span className="px-4 py-2 border rounded-sm border-stone-500 bg-gradient-to-b from-white to-gray-300">
            {currentPage}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 transition duration-200 ease-linear bg-gray-300 rounded hover:bg-gray-500 disabled:opacity-50"
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      </nav>
    </main>
  );
};

export default Homestay;
