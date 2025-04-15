"use client";
import { useDeleteCart } from "@/features/web/cart/useDeleteCart";
import { useFetchUserCarts } from "@/features/web/cart/useFetchUserCarts";
import { CartSchema } from "@/type/schema/CartSchema";
import { confirmDeleteAlert, showDeleteAlert } from "@/utils/AlertUtils";
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { FaTrash } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
const Cart = ({}) => {
  const { data, refetch } = useFetchUserCarts();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data?.filter((item) => {
      const { package: p, ...rest } = item;
      const flat = { ...rest, ...(p || {}) };
      return Object.keys(flat).some((key) => {
        const value = flat[key as keyof CartSchema];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [searchTerm, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = data && Math.ceil(filteredData!.length / itemsPerPage);

  useEffect(() => {
    if (totalPages == 1) setCurrentPage(1);
  }, [totalPages]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Number(totalPages)));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };
  const { mutate } = useDeleteCart({
    onSuccess: () => {
      showDeleteAlert("Cart");
      refetch();
    },
  });
  const handleDeleteCart = (id: string) => {
    confirmDeleteAlert("Cart", id, () => mutate(id));
  };
  return (
    <main className="p-5 bg-white rounded-xl">
      <header className="mb-10">
        <h1 className="text-lg capitalize">My Cart</h1>
      </header>

      <section aria-labelledby="data-table-section">
        <div className="flex justify-between w-full mb-4">
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
              type="text"
              placeholder="Search"
              className=" focus:outline-none border-none !ring-0 border-0  p-0 "
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Search packages"
            />
            <MdClose
              onClick={() => clearSearchTerm()}
              className="cursor-pointer hover:text-slate-500 transition-ease-in-out"
            />
          </label>
        </div>

        <h2 id="data-table-section" className="sr-only">
          Package Data Table
        </h2>

        <table className="min-w-full [&_td]:px-8 table-fixed bg-white">
          <thead>
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">ID</th>
              <th className="py-2 w-full">Package</th>
              <th className="py-2 text-center  ">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="py-2 text-center">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-2 text-center">{item.id}</td>
                <td className="py-2">{item.package.name}</td>
                <td className="flex justify-center items-center flex-wrap md:flex-nowrap gap-4 py-2  w font-normal">
                  <Link
                    href={`/web/package/${item.package_id}`}
                    className="px-4 py-2 capitalize transition duration-300 ease-linear bg-white border rounded text-primary border-primary hover:bg-primary hover:text-white disabled:opacity-50 text-nowrap"
                    aria-label={`More info about ${item.package_id}`}
                  >
                    More Info
                  </Link>
                  <button
                    className="px-4 py-2 text-white capitalize transition-all duration-300 ease-linear bg-green-700 rounded hover:bg-green-800 text-nowrap disabled:opacity-50"
                    aria-label={`Book ${item.package_id}`}
                  >
                    Book Now
                  </button>
                  <Tooltip content="delete" placement="bottom">
                    <button
                      onClick={() => handleDeleteCart(String(item.id))}
                      className="p-3  text-red-500 transition duration-300 ease-linear bg-white border border-red-500 rounded hover:bg-red-500 hover:text-white disabled:opacity-50"
                      aria-label={`Delete ${item.package_id}`}
                    >
                      <FaTrash />
                    </button>
                  </Tooltip>
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
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, Number(filteredData?.length))} of{" "}
          {filteredData?.length} entries
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
            className="px-4 py-2 transition duration-200 ease-linear bg-gray-300 rounded hover:text-white hover:bg-gray-500 disabled:opacity-50"
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      </nav>
    </main>
  );
};

export default Cart;
