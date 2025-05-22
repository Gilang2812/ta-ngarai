"use client";
import ManagementHeader from "@/components/admin/ManagementHeader";
import TableHeaderManagement from "@/components/admin/TableHeaderManagement";
import Button from "@/components/common/Button";
import { DeleteButton } from "@/components/common/DeleteButton";
import { InfoButton } from "@/components/common/InfoButton";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { FormInput } from "@/components/inputs/FormInput";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import { Modal } from "@/components/modal/Modal";
import { useCraftManagement } from "@/hooks/useCraftManagement";
import { formatPrice } from "@/lib/priceFormatter";
import {
  type Craft,
  craftSchema,
  craftVariantSchema,
} from "@/type/schema/CraftSchema";
import { Spinner } from "flowbite-react";
import { Form, Formik } from "formik";
import Link from "next/link";
import React from "react";
import { FaPencil, FaPlus } from "react-icons/fa6";
import { registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { EmptyState } from "@/components/common/EmptyState";
import FilePondComponent from "@/components/common/Filepond";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Craft = () => {
  const {
    isOpen,
    isFormCraft,
    handleCraftForm,
    handleVariantForm,
    handleSubmit,
    initialValues,
    crafts,
    variants,
    isLoading,
    isPending,
    handleDeleteVariant,
  } = useCraftManagement();
  const tableHeaders = ["id", "name", "price", "stock", "modal", "images"];

  const RenderCraft = () => {
    if (variants?.length === 0) {
      return <EmptyState onAddNew={handleVariantForm} />;
    }
    return (
      <table className="[&_td]:text-wrap [&_tbody]:font-normal [&_td]:p-2 text-sm w-full">
        <TableHeaderManagement headers={tableHeaders} />
        <tbody>
          {variants?.map((variant, index) => (
            <tr key={variant.id}>
              <td>{index + 1}</td>
              <td className="text-center">{variant.id}</td>
              <td> {`${variant.craft.name} ${variant.name}`}</td>
              <td className="text-right">{formatPrice(variant.price || 0)}</td>
              <td className="text-right">
                {variant.stock.toLocaleString()} units
              </td>
              <td className="text-right">
                {variant.modal ? formatPrice(variant.modal) : "-"}
              </td>
              <td className="text-center">{variant.craftGalleries.length}</td>
              <td>
                <div className="flex gap-2 items-center justify-center  ">
                  <Link
                    title="edit"
                    className="p-3 bg-white border   rounded border-cyan-400 text-cyan-400 transition-ease-in-out hover:bg-cyan-300 hover:text-white"
                    href={`./craft/${variant.id}`}
                  >
                    <FaPencil />
                  </Link>

                  <InfoButton />
                  <DeleteButton
                    onClick={() =>
                      handleDeleteVariant(
                        variant.id,
                        `${variant.craft.name} ${variant.name}`
                      )
                    }
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (isLoading) {
    return <ManagementSkeletonLoader />;
  }
  return (
    <SingleContentWrapper>
      <div className="flex gap-2 w-full [&_header]:grow">
        <ManagementHeader
          content="craft"
          title="Management Craft"
          onCreateClick={handleCraftForm}
        />
        <Button
          onClick={handleVariantForm}
          type="button"
          text="new craft variant"
          Icon={FaPlus}
        />
      </div>
      <section>
        <RenderCraft />
      </section>

      <Modal
        title={`Create ${isFormCraft ? "Craft" : "Variant"}`}
        isOpen={isOpen}
        onClose={handleCraftForm}
      >
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={isFormCraft ? craftSchema : craftVariantSchema}
          enableReinitialize
        >
          <Form className="space-y-2   ">
            <FormInput type="text" label="name" name="name" />
            {!isFormCraft && (
              <>
                <FormInput label="craft" name="id_craft" as="select">
                  {crafts?.map((craft) => (
                    <option key={craft.id} value={craft.id}>
                      {craft.name}
                    </option>
                  ))}
                </FormInput>
                <FormInput type="number" label="price" name="price" />
                <FormInput type="number" label="modal" name="modal" />
                <FormInput type="number" label="stock" name="stock" />
                <FormInput
                  type="text"
                  rows="4"
                  as="textarea"
                  label="description"
                  name="description"
                />

                <FilePondComponent />
              </>
            )}
            <Button type="submit">{isPending ? <Spinner /> : "Submit"}</Button>
          </Form>
        </Formik>
      </Modal>
    </SingleContentWrapper>
  );
};

export default Craft;
