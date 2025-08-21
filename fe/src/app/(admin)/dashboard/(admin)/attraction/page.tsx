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
import useManageAttraction from "@/hooks/useManageAttraction";
import { formatPrice } from "@/lib/priceFormatter";
import { getAttractionCategory } from "@/utils/common/getAttractionCategory";
import { attractionSchema } from "@/validation/object.validation";
import { Form, Formik } from "formik";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const Attraction = () => {
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
    handleAddAttraction,
    handleEditAttraction,
    handleSubmit,
    handleDeleteAttraction,
    isPending,
    toggleModal,
  } = useManageAttraction();

  if (isLoading) return <ManagementSkeletonLoader />;

  return (
    <SingleContentWrapper>
      {!isOpen ? (
        <section>
          <ManagementHeader
            title="Attraction Management"
            content="Attraction"
            onCreateClick={handleAddAttraction}
          />
          <TableManagementHeader
            handleItemsPerPage={handleItemsPerPage}
            handleSearch={handleSearch}
            itemsPerPage={itemsPerPage}
            searchTerm={searchTerm}
          />
          <Table>
            <TableHeaderManagement
              headers={["id", "name", "type", "price", "category"]}
            />
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{formatPrice(item.price)}</td>
                  <td>{getAttractionCategory(item.category)}</td>
                  <td>
                    <div className="flex items-center gap-4 justify-center">
                      <Button
                        variant={"regEdit"}
                        onClick={() => handleEditAttraction(item)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant={"regDanger"}
                        onClick={() =>
                          handleDeleteAttraction(item.id, item.name)
                        }
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
            validationSchema={attractionSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <Form className="[&_section]:flex grid grid-cols-1 md:grid-cols-2 gap-8 [&_section]:gap-4 [&_section]:items-center spcey-4 leading-loose">
              <article>
                <section>
                  {initialValues.id && (
                    <FormInput label="iD" name="id" placeholder="id" />
                  )}
                  <FormInput
                    label="Attraction Name"
                    name="name"
                    placeholder="Attraction Name"
                  />
                </section>
                <section>
                  <FormInput
                    label="Minimum Capacity"
                    name="min_capacity"
                    type="number"
                    placeholder="Minimum Capacity"
                  />
                  <FormInput
                    label="Attraction Category"
                    as="select"
                    name="category"
                    type="number"
                    placeholder="1 or 2"
                  >
                    <option value={1}>group</option>
                    <option value={2}>individu</option>
                  </FormInput>
                  <FormInput
                    label="Price"
                    name="price"
                    type="number"
                    placeholder="Price"
                  />
                </section>
                <section>
                  <FormInput
                    label="Attraction Type"
                    name="type"
                    placeholder="Attraction Type"
                  />
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
                  <GoogleMapDrawing
                    formType={initialValues.id ? "edit" : "create"}
                    geom={
                      initialValues.geom &&
                      typeof initialValues.geom === "string"
                        ? JSON.parse(initialValues.geom)
                        : undefined
                    }
                  />
                </section>
              </article>
            </Form>
          </Formik>
        </section>
      )}
    </SingleContentWrapper>
  );
};

export default Attraction;
