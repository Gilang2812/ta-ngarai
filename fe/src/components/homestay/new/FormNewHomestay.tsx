import Button from "@/components/common/Button";
import FilePondComponent from "@/components/common/Filepond";
import { FormInput } from "@/components/inputs/FormInput";
import GoogleMapDrawing from "@/components/map/GoogleMapDrawing";
import { ROUTES } from "@/data/routes";
import { getCentroid } from "@/utils/common/getCentroid";
import { CreateHomestaySchema } from "@/validation/homestaySchema";
import { Form, useFormikContext } from "formik";
import { MultiPolygon } from "geojson";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
type Props = {
  isPending: boolean;
  geom?: MultiPolygon | null;
  formType?: "create" | "edit";
  left?: ReactNode;
  right?: ReactNode;
};
const FormNewHomestay: React.FC<Props> = ({
  isPending,
  formType = "create",
  left,
  right,
}) => {
  const { values, setFieldValue, setFieldError } =
    useFormikContext<CreateHomestaySchema>();
  useEffect(() => {
    if (values.close < values.open) {
      setFieldValue("close", values.open);
      setFieldError("close", "Close time must be after open time");
    }
  }, [values.open, values.close, setFieldValue, setFieldError]);

  useEffect(() => {
    if (values.geom) {
      setFieldValue(
        "latitude",
        getCentroid(
          typeof values.geom === "string"
            ? JSON.parse(values.geom)
            : values.geom
        ).lat
      );
      setFieldValue(
        "longitude",
        getCentroid(
          typeof values.geom === "string"
            ? JSON.parse(values.geom)
            : values.geom
        ).lng
      );
    }
  }, [values.geom, setFieldValue]);

  return (
    <Form className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Homestay Details Section */}
      <section className="p-4 bg-white rounded-md space-y-4 leading-loose">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-center">
            {!(formType === "edit") && "new"} Homestay
          </h2>
          {formType === "edit" && (
            <div className="flex items-center justify-end">
              <Button asChild className="p-1 h-fit">
                <Link href={ROUTES.NEW_HOMESTAY}>
                  <FaPlus />
                  Add Unit
                </Link>
              </Button>
            </div>
          )}
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
            type="number"
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
        </div>
        {left}
      </section>

      {/* Google Maps Section */}
      <section className="p-4 bg-white rounded-md">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Google Maps</h2>

          <div className="grid grid-cols-2 mb-8  gap-4">
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
            className="flex border-2 items-center min-h-fit relative overflow-hidden  border-red-500 justify-center w-full h-64 text-black bg-gray-200"
            aria-label="Google Maps Placeholder"
          >
            <GoogleMapDrawing />
          </div>
        </div>
        {right}
      </section>
    </Form>
  );
};

export default FormNewHomestay;
