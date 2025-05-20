"use client";
import ManagementHeader from "@/components/admin/ManagementHeader";
import TableHeaderManagement from "@/components/admin/TableHeaderManagement";
import Button from "@/components/common/Button";
import { DeleteButton } from "@/components/common/DeleteButton";
import { EditButton } from "@/components/common/EditButton";
import { SinggleContentWrapper } from "@/components/common/SingleContentWrapper";
import { FormInput } from "@/components/inputs/FormInput";
import { TableRawSkeleton } from "@/components/loading/TableRawSkeleton";
import GoogleMapDrawing from "@/components/map/GoogleMapDrawing";
import { Modal } from "@/components/modal/Modal";
import { useManageMarketplace } from "@/hooks/useManageMarketplaec";
import { timeFormatter } from "@/lib/timeFormatter";
import {
  FormMarketplace,
  marketplaceSchema,
} from "@/type/schema/MarketplaceSchema";
import { Spinner } from "flowbite-react";
import { Form, Formik, useFormikContext } from "formik";

const Umkm = () => {
  const tableHeaders = [
    "id",
    "name",
    "address",
    "contact_person",
    "open",
    "close",
    "description",
  ];

  const {
    handleOpenCreateModal,
    handleOpenEditModal,
    handleSubmit,
    initialValues,
    isOpen,
    handleDelete,
    isPending,
    toggleModal,
    data,
    isLoading,
    formType,
  } = useManageMarketplace();

  const DrawingMarketplaceMap = () => {
    const { values } = useFormikContext<FormMarketplace>();
    return (
      <GoogleMapDrawing
        geom={values.geom ? JSON.parse(values.geom) : null}
        formType={formType}
      />
    );
  };

  const RenderSouvenirPlace = () => {
    if (isLoading) return <TableRawSkeleton tableHead={tableHeaders} />;
    return (
      <table className="w-full [&_td]:text-wrap [&_td]:p-2 text-sm">
        <TableHeaderManagement headers={tableHeaders} />
        <tbody>
          {data?.map((sp, index) => (
            <tr className="border-b" key={index}>
              <td>{index + 1}</td>
              <td>{sp.id}</td>
              <td>{sp.name}</td>
              <td>{sp.address}</td>
              <td>{sp.contact_person}</td>
              <td>{timeFormatter(sp.open)}</td>
              <td>{timeFormatter(sp.close)}</td>
              <td>{sp.description}</td>
              <td>
                <div className="flex gap-2 justify-center items-center">
                  <EditButton onClick={() => handleOpenEditModal(sp)} />
                  <DeleteButton onClick={() => handleDelete(sp.name, sp.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <SinggleContentWrapper>
      <ManagementHeader
        content="marketplace"
        title="manage marketplace"
        onCreateClick={handleOpenCreateModal}
      />
      <section>
        <RenderSouvenirPlace />
      </section>

      <Modal
        isOpen={isOpen}
        onClose={toggleModal}
        title={`${initialValues.id ? "edit" : "create"} marketplace`}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={marketplaceSchema}
          enableReinitialize
        >
          <Form className="space-y-2">
            {initialValues.id && (
              <FormInput type={"text"} label={`id`} name="id" readonly />
            )}
            <FormInput type={"text"} label={`name`} name="name" />
            <FormInput type={"text"} label={`address`} name="address" />
            <FormInput
              type={"text"}
              label={`contact_person`}
              name="contact_person"
            />
            <FormInput type={"time"} label={`open`} name="open" />
            <FormInput type={"time"} label={`close`} name="close" />
            <FormInput type={"text"} label={`description`} name="description" />
            <FormInput type={"text"} label={`geojson`} name="geom" readonly />
            <DrawingMarketplaceMap />
            <Button
              variant={`${isPending ? "secondary" : "default"}`}
              type="submit"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : initialValues.id ? "edit" : "Submit"}
            </Button>
          </Form>
        </Formik>
      </Modal>
    </SinggleContentWrapper>
  );
};

export default Umkm;
