import Button from "@/components/common/Button";
import FilePondComponent from "@/components/common/Filepond";
import { FormInput } from "@/components/inputs/FormInput";
import GoogleMapDrawing from "@/components/map/GoogleMapDrawing";
import { CreateHomestaySchema } from "@/validation/homestaySchema";
import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";
type Props = {
  isPending: boolean;
};
const FormNewHomestay: React.FC<Props> = ({ isPending }) => {
  const { values, setFieldValue, setFieldError } =
    useFormikContext<CreateHomestaySchema>();
  useEffect(() => {
    if (values.close < values.open) {
      setFieldValue("close", values.open);
      setFieldError("close", "Close time must be after open time");
    }
  }, [values.open, values.close, setFieldValue, setFieldError]);
  return (
    <Form className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Homestay Details Section */}
      <section className="p-4 bg-white rounded-md space-y-4 leading-loose">
        <h2 className="mb-4 text-lg font-semibold text-center">New Homestay</h2>

        <FormInput
          placeholder="geo json"
          name="geom"
          type="text"
          label="Geo JSON"
          readonly
        />
        <FormInput
          placeholder="homestay name"
          name="name"
          type="text"
          label="Homestay Name"
          required
        />
        <FormInput
          placeholder="address"
          name="address"
          type="text"
          label="Address"
          required
        />
        <FormInput
          placeholder="contact person"
          name="contact_person"
          type="text"
          label="Contact Person"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput name="open" type="time" label="Open" required />
          <FormInput name="close" type="time" label="Close" required />
        </div>

        <FormInput
          as="textarea"
          name="description"
          type="textarea"
          rows={4}
          label="Description"
        />
        <FilePondComponent />

        <div className="flex space-x-4 font-normal">
          <button
            type="reset"
            className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md shadow-md hover:bg-gray-300"
          >
            Reset
          </button>
          <Button type="submit" isLoading={isPending} disabled={isPending}>
            Save & Add Facility
          </Button>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="p-4 bg-white rounded-md">
        <h2 className="mb-4 text-lg font-semibold">Google Maps</h2>

        <div className="grid grid-cols-2  gap-4">
          <FormInput
            name="latitude"
            type="text"
            label="Latitude"
            placeholder="eg. -0.52435750"
          />
          <FormInput
            name="longitude"
            type="text"
            label="Longitude"
            placeholder="eg. 100.49234850"
          />
        </div>

        {/* Map Section */}
        <div
          className="flex border items-center justify-center w-full h-64 text-black bg-gray-200"
          role="img"
          aria-label="Google Maps Placeholder"
        >
          <GoogleMapDrawing geom={null} formType="create" />
        </div>
      </section>
    </Form>
  );
};

export default FormNewHomestay;
