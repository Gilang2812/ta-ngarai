import Button from "@/components/common/Button";
import FilePondComponent from "@/components/common/Filepond";
import { ValidateClose } from "@/components/common/ValidateClose";
import { FormInput } from "@/components/inputs/FormInput";
import GoogleMapDrawing from "@/components/map/GoogleMapDrawing";
import useFormMarketplace from "@/hooks/useFormMarketplace";
import {
  FormMarketplace,
  marketplaceSchema,
} from "@/type/schema/MarketplaceSchema";
import { Spinner } from "flowbite-react";
import { Form, Formik } from "formik";
import React from "react";

const MarketplaceForm = ({
  existingMarketplace,
  updateSuccess,
}: {
  updateSuccess?: () => void;
  existingMarketplace?: FormMarketplace;
}) => {
  const { initialValues, isPending, handleSubmit } = useFormMarketplace(
    existingMarketplace,
    updateSuccess
  );

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        validationSchema={marketplaceSchema}
        enableReinitialize
      >
        <Form className="space-y-2 grid grid-flow-col gap-8  ">
          <section className="space-y-2">
            {initialValues.id && (
              <FormInput type={"text"} label={`id`} name="id" readonly />
            )}
            <FormInput type={"text"} label={`name`} name="name" />
            <FormInput type={"text"} label={`address`} name="address" />
            <FormInput
              type={"number"}
              label={`contact_person`}
              name="contact_person"
            />

            <FormInput type={"time"} label={`open`} name="open" />
            <FormInput type={"time"} label={`close`} name="close" />
            <FormInput type={"text"} label={`description`} name="description" />
            <FormInput type={"text"} label={`geojson`} name="geom" readonly />
            <FilePondComponent />
            <ValidateClose />
          </section>
          <section className="space-y-4">
            <GoogleMapDrawing />
            <Button
              variant={`${isPending ? "secondary" : "default"}`}
              type="submit"
              className="h-fit"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : initialValues.id ? "edit" : "Submit"}
            </Button>
          </section>
        </Form>
      </Formik>
    </div>
  );
};

export default MarketplaceForm;
