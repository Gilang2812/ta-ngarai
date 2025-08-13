"use client";

import ManagementFooter from "@/components/admin/ManagementFooter";
import ManagementHeader from "@/components/admin/ManagementHeader";
import TableHeaderManagement from "@/components/admin/TableHeaderManagement";
import TableManagementHeader from "@/components/admin/TableManagementHeader";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { Table } from "@/components/common/Table";
import { ROUTES } from "@/data/routes";
import useManageHomestayPage from "@/hooks/useManageHomestayPage";
import { getHHomestayStatus } from "@/utils/getHomestayStatus";
import Link from "next/link";
import { FaTrash, FaCircleInfo } from "react-icons/fa6";

const Homestay = () => {
  const {
    HandleDelete,
    isLoading,
    searchTerm,
    handleSearch,
    currentItems,
    currentPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems,
    handleNextPage,
    handlePrevPage,
    handleItemsPerPage,
  } = useManageHomestayPage();

  if (isLoading) return <div>Loading...</div>;
  return (
    <SingleContentWrapper>
      <ManagementHeader
        title="Manage Homestays"
        asChild
        content="Homestay"
        href={ROUTES.NEW_HOMESTAY}
      />
      <TableManagementHeader
        handleItemsPerPage={handleItemsPerPage}
        handleSearch={handleSearch}
        itemsPerPage={itemsPerPage}
        searchTerm={searchTerm}
      />

      <section aria-labelledby="data-table-section">
        <Table>
          <TableHeaderManagement headers={["ID", "Name", "Status"]} />
          <tbody>
            {currentItems?.map((item, index) => (
              <tr key={item.id} className="border-t text-center">
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{getHHomestayStatus(item.homestay_status as number)}</td>
                <td className="flex justify-center gap-4 py-2">
                  <Link
                    href={`./homestay/${item.id}`}
                    className="p-3 capitalize transition duration-300 ease-linear bg-white border rounded text-primary border-primary hover:bg-primary hover:text-white"
                    aria-label="View Homestay Info"
                  >
                    <FaCircleInfo />
                  </Link>
                  <button
                    onClick={() => HandleDelete(item)}
                    className="p-3 text-red-500 transition duration-300 ease-linear bg-white border border-red-500 rounded hover:bg-red-500 hover:text-white"
                    aria-label="Delete Homestay"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <ManagementFooter
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        totalItems={totalItems}
        totalPages={totalPages}
      />
    </SingleContentWrapper>
  );
};

export default Homestay;
