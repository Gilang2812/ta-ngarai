"use client";
import ManagementFooter from "@/components/admin/ManagementFooter";
import ManagementHeader from "@/components/admin/ManagementHeader";
import TableHeaderManagement from "@/components/admin/TableHeaderManagement";
import TableManagementHeader from "@/components/admin/TableManagementHeader";
import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { Table } from "@/components/common/Table";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import { ROUTES } from "@/data/routes";
import useManagePackage from "@/hooks/useManagePackage";
import Link from "next/link";
import React from "react";
import { FaCircleInfo, FaTrash } from "react-icons/fa6";

const ManagePackage = () => {
  const {
    isLoading, 
    currentItems,
    handleSearch,
    currentPage,
    handleItemsPerPage,
    handleNextPage,
    handlePrevPage,
    indexOfFirstItem,
    indexOfLastItem,
    itemsPerPage,
    totalPages,
    searchTerm,
    totalItems,
    handleDeletePackage,
  } = useManagePackage();
  if (isLoading) return <ManagementSkeletonLoader />;
  return (
    <SingleContentWrapper>
      <ManagementHeader
        asChild
        href={ROUTES.NEW_PACKAGE}
        content="package"
        title="Manage Package"
      />
      <section>
        <TableManagementHeader 
          handleItemsPerPage={handleItemsPerPage}
          handleSearch={handleSearch}
          itemsPerPage={itemsPerPage}
          searchTerm={searchTerm}
        />
        <Table>
          <TableHeaderManagement headers={["ID", "Name"]} />
          <tbody>
            {currentItems.map((p, index) => (
              <tr key={`${p.id}-${index}`} className="text-center">
                <td className="text-center">{indexOfFirstItem + index + 1}</td>
                <td className="text-center">{p.id}</td>
                <td className=" w-full max-w-[800px]">{p.name}</td>
                <td className="w-fit">
                  <div className="flex min-w-fit  items-center justify-center gap-2 flex-wrap lg:flex-nowrap">
                    <Button asChild variant={"primary"}>
                      <Link href={ROUTES.MANAGE_DETAIL_PACKAGE(p.id)}>
                        <FaCircleInfo />
                      </Link>
                    </Button>
                    <Button
                      onClick={() => handleDeletePackage(p)}
                      variant={"regDanger"}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ManagementFooter
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          totalPages={totalPages}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          totalItems={totalItems}
        />
      </section>
    </SingleContentWrapper>
  );
};

export default ManagePackage;
