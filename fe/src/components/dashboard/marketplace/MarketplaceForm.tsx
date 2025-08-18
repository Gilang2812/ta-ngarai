import Button from "@/components/common/Button";
import { FormInput } from "@/components/inputs/FormInput";
import GoogleMapDrawing from "@/components/map/GoogleMapDrawing";
import useFormMarketplace from "@/hooks/useFormMarketplace";
import {
  FormMarketplace,
  marketplaceSchema,
} from "@/type/schema/MarketplaceSchema";
import { Spinner } from "flowbite-react";
import { Form, Formik, useFormikContext } from "formik";
import React from "react";

interface Props {
  toggle: () => void;
}
const MarketplaceForm = ({ toggle }: Props) => {
  const { initialValues, isPending, handleSubmit } = useFormMarketplace({
    onSuccessForm: toggle,
  });

  const DrawingMarketplaceMap = () => {
    const { values } = useFormikContext<FormMarketplace>();
    return (
      <GoogleMapDrawing
        geom={values.geom ? JSON.parse(values.geom) : null}
        formType={"create"}
      />
    );
  };
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
              type={"text"}
              label={`contact_person`}
              name="contact_person"
            />

            <FormInput type={"time"} label={`open`} name="open" />
            <FormInput type={"time"} label={`close`} name="close" />
            <FormInput type={"text"} label={`description`} name="description" />
            <FormInput type={"text"} label={`geojson`} name="geom" readonly />
          </section>
          <section className="space-y-4">
            <DrawingMarketplaceMap />
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
