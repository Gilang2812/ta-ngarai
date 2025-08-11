"use client";

import ManagementFooter from "@/components/admin/ManagementFooter";
import ManagementHeader from "@/components/admin/ManagementHeader";
import TableHeaderManagement from "@/components/admin/TableHeaderManagement";
import TableManagementHeader from "@/components/admin/TableManagementHeader";
import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { Table } from "@/components/common/Table";
import { FormInput } from "@/components/inputs/FormInput";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import { Modal } from "@/components/modal/Modal";
import { usePackageType } from "@/hooks/usePackageType";
import { Form, Formik } from "formik";
import React from "react";
import { FaCircleInfo, FaTrash } from "react-icons/fa6";

const PackageType = () => {
  const {
    isLoading,
    handleNextPage,
    handlePrevPage,
    handleItemsPerPage,
    currentItems,
    currentPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems,
    handleSearch,
    searchTerm,
    handleCreatePackageType,
    handleUpdatePackageType,
    handleDeletePackageType,
    isPending,
    handleSubmit,
    isOpen,
    initialValues,
    toggleModal,
  } = usePackageType();
  if (isLoading) return <ManagementSkeletonLoader />;
  return (
    <SingleContentWrapper>
      <ManagementHeader
        title="Manage Package Type"
        content="Package Type"
        onCreateClick={handleCreatePackageType}
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
            {currentItems.map((item, index) => (
              <tr className="text-center border-b" key={item.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.id}</td>
                <td>{item.type_name}</td>
                <td>
                  <div className="flex gap-2 items-center justify-center lg:flex-nowrap">
                    <Button
                      onClick={() => handleUpdatePackageType(item)}
                      type="button"
                      variant="primary"
                    >
                      <FaCircleInfo />
                    </Button>
                    <Button
                      onClick={() => handleDeletePackageType(item)}
                      type="button"
                      variant="regDanger"
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
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          totalItems={totalItems}
        />
      </section>
      <Modal
        title={`${initialValues.id ? "Edit" : "Create"} Package Type`}
        isOpen={isOpen}
        onClose={toggleModal}
      >
        <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="space-y-2 leading-loose">
            {initialValues.id && <FormInput readonly name="id" label="ID" />}
            <FormInput name="type_name" label="Type Name" />
            <Button isLoading={isPending} type="submit" disabled={isPending}>
              {initialValues.id ? "Update" : "Create"}
            </Button>
          </Form>
        </Formik>
      </Modal>
    </SingleContentWrapper>
  );
};

export default PackageType;
