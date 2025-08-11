"use client";
import Button from "@/components/common/Button";
import FilePondComponent from "@/components/common/Filepond";
import { FormInput } from "@/components/inputs/FormInput";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import { useEditVillage } from "@/hooks/useEditVillage";
import { Form, Formik } from "formik";
import React from "react";

type Props = {
  id: string;
};

const EditVillageForm = ({ id }: Props) => {
  const { isLoading, initialValues, isPending, handleSubmit } =
    useEditVillage(id);
  if (isLoading) return <ManagementSkeletonLoader />;
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <Form encType="multipart/form-data">
        <section className="grid grid-cols-2 gap-8">
          {/* Left Column: Form Fields */}
          <section className="col-span-1 space-y-4 leading-loose">
            <FormInput label="Name" name="name" type="text" />
            <FormInput
              label="Type of Tourism"
              name="type_of_tourism"
              type="text"
            />
            <FormInput label="Address" name="address" type="text" />
            <FormInput label="Open Time" name="open" type="time" />
            <FormInput label="Close Time" name="close" type="time" />
            <FormInput label="Ticket Price" name="ticket_price" type="number" />
            <FormInput
              label="Contact Person"
              name="contact_person"
              type="text"
            />
            <FormInput label="Bank Name" name="bank_name" type="text" />
            <FormInput label="Bank Code" name="bank_code" type="text" />
            <FormInput
              label="Bank Account Holder"
              name="bank_account_holder"
              type="text"
            />
            <FormInput
              label="Bank Account Number"
              name="bank_account_number"
              type="text"
            />

            <div>
              <FilePondComponent
                allowMultiple={false}
                name="qr_url"
                label="QR Image"
              />
            </div>
          </section>

          {/* Right Column: Gallery Image Uploader */}
          <section className="col-span-1 leading-loose">
            <FilePondComponent label="Galleries" />
          </section>

          <div>
            <Button isLoading={isPending} disabled={isPending} type="submit">
              Save
            </Button>
          </div>
        </section>
      </Form>
    </Formik>
  );
};

export default EditVillageForm;
