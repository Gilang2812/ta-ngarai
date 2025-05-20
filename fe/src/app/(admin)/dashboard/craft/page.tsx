"use client";
import ManagementHeader from "@/components/admin/ManagementHeader";
import TableHeaderManagement from "@/components/admin/TableHeaderManagement";
import Button from "@/components/common/Button";
import { SinggleContentWrapper } from "@/components/common/SingleContentWrapper";
import { FormInput } from "@/components/inputs/FormInput";
import { Modal } from "@/components/modal/Modal";
import { useCrafManagement } from "@/hooks/useCraftManagement";
import { craftSchema, craftVariantSchema } from "@/type/schema/CraftSchema";
import { Form, Formik } from "formik";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const Craft = () => {
  const {
    isOpen,
    isFormCraft,
    handleCraftForm,
    handleVariantForm,
    handleSubmit,
    initialValues,
  } = useCrafManagement();
  const tableHeaders = ["id", "name", "variants", "images"];

  const RenderCraft = () => {
    return (
      <table className="[&_td]:text-wrap [&_td]:p-2 text-sm w-full">
        <TableHeaderManagement headers={tableHeaders} />
      </table>
    );
  };
  return (
    <SinggleContentWrapper>
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
          <Form className="space-y-2">
            <FormInput type="text" label="name" name="name" />
            {!isFormCraft && (
              <>
                <FormInput label="craft" name="id_craft" as="select">
                  <option value="1">select</option>
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
              </>
            )}
            <Button type="submit" text="submit" />
          </Form>
        </Formik>
      </Modal>
    </SinggleContentWrapper>
  );
};

export default Craft;
