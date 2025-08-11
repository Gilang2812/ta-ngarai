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
import { useServicePackage } from "@/hooks/useServicePackage";
import { Form, Formik } from "formik";
import React from "react";
import { FaCircleInfo, FaTrash } from "react-icons/fa6";

const ServicePackage = () => {
  const {
    searchTerm,
    handleSearch,
    isLoading,
    handleItemsPerPage,
    itemsPerPage,
    handleNextPage,
    handlePrevPage,
    currentItems,
    currentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems,
    handleAddService,
    handleUpdateService,
    handleDeleteService,
    initialValues,
    isOpen,
    toggleModal,
    handleSubmit,
    isPending,
  } = useServicePackage();
  if (isLoading) return <ManagementSkeletonLoader />;
  return (
    <SingleContentWrapper>
      <ManagementHeader
        content="Service"
        title="Manage Service"
        onCreateClick={handleAddService}
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
              <tr key={item.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <div className="flex gap-2 items-center justify-center lg:flex-nowrap">
                    <Button
                      onClick={() => handleUpdateService(item)}
                      type="button"
                      variant="primary"
                    >
                      <FaCircleInfo />
                    </Button>
                    <Button
                      onClick={() => handleDeleteService(item)}
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
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          currentPage={currentPage}
          totalPages={totalPages}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          totalItems={totalItems}
        />
      </section>
      <Modal
        title={initialValues.id ? "Update Service" : "Create Service"}
        isOpen={isOpen}
        onClose={toggleModal}
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-2 leading-loose">
            {initialValues.id && <FormInput readonly name="id" label="ID" />}
            <FormInput type="text" name="name" label="Name" />
            <FormInput as="select" type="number" name="category" label="Category">
              <option value={1}>Group</option>
              <option value={2}>Individual</option>
            </FormInput>
            <FormInput type="number" name="min_capacity" label="Min Capacity" />
            <FormInput type="number" name="price" label="Price" />
            <Button isLoading={isPending} type="submit" disabled={isPending}>
              {initialValues.id ? "Update" : "Create"}
            </Button>
          </Form>
        </Formik>
      </Modal>
    </SingleContentWrapper>
  );
};

export default ServicePackage;
