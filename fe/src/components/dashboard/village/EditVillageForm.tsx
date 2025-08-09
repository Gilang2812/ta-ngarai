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
  const { isLoading, initialValues } = useEditVillage(id);
  if (isLoading) return <ManagementSkeletonLoader />;
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values) => {
        console.log(values);
        // Append QR image if it exists
      }}
    >
      <Form encType="multipart/form-data">
        <section className="grid grid-cols-2 gap-8">
          {/* Left Column: Form Fields */}
          <section className="col-span-1 space-y-4 leading-loose">
            <FormInput name="name" type="text" />

            <FormInput name="type_of_tourism" type="text" />
            <FormInput name="address" type="text" />
            <FormInput name="open" type="time" />
            <FormInput name="close" type="time" />
            <FormInput name="ticket_price" type="number" />
            <FormInput name="contact_person" type="text" />
            <FormInput name="bank_name" type="text" />
            <FormInput name="bank_code" type="text" />
            <FormInput name="bank_account_holder" type="text" />

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
            <Button type="submit">Save</Button>
          </div>
        </section>
      </Form>
    </Formik>
  );
};

export default EditVillageForm;
