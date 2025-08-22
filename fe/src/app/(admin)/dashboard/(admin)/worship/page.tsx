"use client";

import ManagementFooter from "@/components/admin/ManagementFooter";
import ManagementHeader from "@/components/admin/ManagementHeader";
import TableHeaderManagement from "@/components/admin/TableHeaderManagement";
import TableManagementHeader from "@/components/admin/TableManagementHeader";
import Button from "@/components/common/Button";
import FilePondComponent from "@/components/common/Filepond";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { Table } from "@/components/common/Table";
import { FormInput } from "@/components/inputs/FormInput";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import GoogleMapDrawing from "@/components/map/GoogleMapDrawing";
import useManageWorship from "@/hooks/useManageWorship";
import { worshipSchema } from "@/validation/object.validation";
import { Form, Formik } from "formik";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const Worship = () => {
  const {
    isOpen,
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
    initialValues,
    handleAddWorship,
    handleEditWorship,
    handleSubmit,
    handleDeleteWorship,
    isPending,
    toggleModal,
  } = useManageWorship();

  if (isLoading) return <ManagementSkeletonLoader />;

  return (
    <SingleContentWrapper>
      {!isOpen ? (
        <section>
          <ManagementHeader
            title="Worship Management"
            content="Worship"
            onCreateClick={handleAddWorship}
          />
          <TableManagementHeader
            handleItemsPerPage={handleItemsPerPage}
            handleSearch={handleSearch}
            itemsPerPage={itemsPerPage}
            searchTerm={searchTerm}
          />
          <Table>
            <TableHeaderManagement
              headers={["id", "name", "address", "capacity"]}
            />
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.capacity}</td>
                  <td>
                    <div className="flex items-center gap-4 justify-center">
                      <Button
                        variant={"regEdit"}
                        onClick={() => handleEditWorship(item)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant={"regDanger"}
                        onClick={() => handleDeleteWorship(item.id, item.name)}
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
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
            totalItems={totalItems}
            totalPages={totalPages}
          />
        </section>
      ) : (
        <section>
          <header>
            <h2>Form Worship</h2>
          </header>
          <Formik
            validationSchema={worshipSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <Form className="[&_section]:flex grid grid-cols-1 md:grid-cols-2 gap-8 [&_section]:gap-4 [&_section]:items-center spcey-4 leading-loose">
              <article>
                <section>
                  {initialValues.id && (
                    <FormInput label="ID" name="id" placeholder="id" />
                  )}
                  <FormInput
                    label="Worship Name"
                    name="name"
                    placeholder="Worship Name"
                  />
                </section>
                <section>
                  <FormInput
                    label="Address"
                    name="address"
                    placeholder="Address"
                  />
                  <FormInput
                    label="Capacity"
                    name="capacity"
                    type="number"
                    placeholder="Capacity"
                  />
                </section>
                <section>
                  <FormInput
                    label="Status"
                    as="select"
                    name="status"
                    placeholder="Status"
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </FormInput>
                  <FormInput
                    label="Description"
                    name="description"
                    placeholder="Description"
                  />
                </section>
                <FilePondComponent />
                <section>
                  <Button
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                  >
                    Submit
                  </Button>
                  <Button onClick={toggleModal} variant={"secondary"}>
                    close
                  </Button>
                </section>
              </article>
              <article>
                <section>
                  <FormInput
                    label="geojson"
                    name="geom"
                    readonly
                    placeholder="geom"
                  />
                </section>
                <section className="py-4">
                  <GoogleMapDrawing />
                </section>
              </article>
            </Form>
          </Formik>
        </section>
      )}
    </SingleContentWrapper>
  );
};

export default Worship;
