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
import useManageTraditional from "@/hooks/useManageTraditionalHouse";
import { formatPrice } from "@/lib/priceFormatter";
import { getAttractionCategory } from "@/utils/common/getAttractionCategory";
import { traditionalSchema } from "@/validation/object.validation";
import { Form, Formik } from "formik";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

export default function TraditionalHouse() {
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
    handleAddTraditional,
    handleEditTraditional,
    handleSubmit,
    handleDeleteTraditional,
    isPending,
    toggleModal,
  } = useManageTraditional();

  if (isLoading) return <ManagementSkeletonLoader />;

  return (
    <SingleContentWrapper>
      {!isOpen ? (
        <section>
          <ManagementHeader
            title="Traditional House Management"
            content="Traditional House"
            onCreateClick={handleAddTraditional}
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
                  <td>{item.address}</td>
                  <td>{item.contact_person}</td>
                  <td>{getAttractionCategory(item.category)}</td>
                  <td>{formatPrice(item.ticket_price)}</td>
                  <td>{item.open}</td>
                  <td>{item.close}</td>
                  <td>
                    <div className="flex items-center gap-4 justify-center">
                      <Button
                        variant={"regEdit"}
                        onClick={() => handleEditTraditional(item)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant={"regDanger"}
                        onClick={() =>
                          handleDeleteTraditional(item.id, item.name)
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
            <h2>Form Traditional House</h2>
          </header>
          <Formik
            validationSchema={traditionalSchema}
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
                    label="Traditional House Name"
                    name="name"
                    placeholder="Traditional House Name"
                  />
                </section>
                <section>
                  <FormInput
                    label="Address"
                    name="address"
                    placeholder="Address"
                  />
                  <FormInput
                    label="Contact Person"
                    name="contact_person"
                    placeholder="Contact Person"
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
                    label="Traditional House Category"
                    as="select"
                    name="category"
                    type="number"
                    placeholder="1 or 2"
                  >
                    <option value={1}>group</option>
                    <option value={2}>individu</option>
                  </FormInput>
                </section>
                <section>
                  <FormInput
                    label="Ticket Price"
                    name="ticket_price"
                    type="number"
                    placeholder="Ticket Price"
                  />
                  <FormInput
                    type="time"
                    label="Open Times"
                    name="open"
                    placeholder="Open Time"
                  />
                </section>
                <section>
                  <FormInput
                    type="time"
                    label="Close Time"
                    name="close"
                    placeholder="Close Time"
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
                  <GoogleMapDrawing />
                </section>
              </article>
            </Form>
          </Formik>
        </section>
      )}
    </SingleContentWrapper>
  );
}
