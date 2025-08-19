"use client";
import ManagementHeader from "@/components/admin/ManagementHeader";
import Button from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { FormInput } from "@/components/inputs/FormInput";
import { TableRawSkeleton } from "@/components/loading/TableRawSkeleton";
import GoogleMapDrawing from "@/components/map/GoogleMapDrawing";
import { Modal } from "@/components/modal/Modal";
import { ROUTES } from "@/data/routes";
import { useManageUserMarketplace } from "@/hooks/useManageUserMarketplace";
import { timeFormatter } from "@/lib/timeFormatter";
import {
  FormMarketplace,
  marketplaceSchema,
} from "@/type/schema/MarketplaceSchema";
import { Spinner } from "flowbite-react";
import { Form, Formik, useFormikContext } from "formik";
import { ArrowRight, Clock, Edit, Store, Trash2 } from "lucide-react";
import Link from "next/link";

const Marketplace = () => {
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
  } = useManageUserMarketplace();

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
    if (data?.length === 0)
      return <EmptyState onAddNew={handleOpenCreateModal} />;
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((sp, index) => (
          <Link
            key={index}
            className="bg-white rounded-lg shadow-md border p-4 hover:shadow-xl hover:border-primary/30 transition-all duration-200 cursor-pointer group relative"
            href={ROUTES.MANAGE_CRAFT(sp.id)}
          >
            {/* Hover indicator */}
            <section className="absolute top-3 right-3 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-primary/10 p-1 rounded-full">
                <ArrowRight size={14} className="text-primary" />
              </div>
            </section>

            {/* Header dengan icon toko dan nama */}
            <section className="mb-3 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Store size={20} className="text-primary" />
              </div>
              <h3
                className="font-semibold text-lg text-gray-800 truncate flex-1 group-hover:text-secondary transition-colors"
                title={sp.name}
              >
                {sp.name}
              </h3>
            </section>

            {/* Jam operasional */}
            <section className="flex items-center gap-2 mb-4 text-gray-600">
              <Clock size={16} />
              <span className="text-sm">
                {timeFormatter(sp.open)} - {timeFormatter(sp.close)}
              </span>
            </section>

            {/* Click to view details hint */}
            <section className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-xs text-secondary font-medium">
                Click to view details →
              </p>
            </section>

            {/* Action buttons */}
            <section className="flex gap-2 justify-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOpenEditModal(sp);
                }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(sp.name, sp.id);
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </section>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <SingleContentWrapper>
      <ManagementHeader
        asChild
        content="marketplace"
        title="manage marketplace"
        href={ROUTES.NEW_MARKETPLACE}
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
    </SingleContentWrapper>
  );
};

export default Marketplace;
