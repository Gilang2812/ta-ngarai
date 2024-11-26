"use client";
import { FormInput } from "@/components/inputs/FormInput";
import { FormInputSkeleton } from "@/components/loading/FormInputSekelton";
import { useGetHomestay } from "@/features/dashboard/homestay/useGetHomestay";
import { showCreateAlert } from "@/utils/AlertUtils";
import { CreateHomestaySchema } from "@/validation/homestaySchema";
import { Spinner } from "flowbite-react";
import { Formik, Form } from "formik";
import { DetailFacilitySection } from "./DetailFacilitySection";
import { useUpdateHomestay } from "@/features/dashboard/homestay/useUpdateHomestay";

export const EditHomestaySection = ({ id }: { id: string }) => {
  const { data, isLoading, refetch } = useGetHomestay(id);

  const { mutate, isPending } = useUpdateHomestay({
    onSuccess: () => {
      showCreateAlert("homestay");
    },
  });
  if (isLoading) {
    return (
      <div className="grid grid-cols-2  gap-8">
        <FormInputSkeleton />
        <FormInputSkeleton />
      </div>
    );
  }
  const handleSubmit = (values: CreateHomestaySchema) => {
    mutate(values);
  };
  const initialValues: CreateHomestaySchema & { id: string } = {
    id: id,
    geom: JSON.stringify(data!.geom),
    name: data!.name,
    address: data!.address,
    contact_person: data!.contact_person,
    open: String(data!.open),
    close: String(data!.close),
    description: data!.description,
    gallery: null,
    latitude: "",
    longitude: "",
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Homestay Details Section */}

            <>
              <section>
                <div className="p-4 bg-white rounded-xl space-y-4 leading-loose">
                  <h2 className="mb-4 text-lg font-semibold text-center">
                    Homestay
                  </h2>

                  <FormInput
                    name="geom"
                    type="text"
                    label="Geo JSON"
                    readonly
                  />
                  <FormInput
                    name="name"
                    type="text"
                    label="Homestay Name"
                    required
                  />
                  <FormInput
                    name="address"
                    type="text"
                    label="Address"
                    required
                  />
                  <FormInput
                    name="contact_person"
                    type="text"
                    label="Contact Person"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput name="open" type="time" label="Open" required />
                    <FormInput
                      name="close"
                      type="time"
                      label="Close"
                      required
                    />
                  </div>

                  <FormInput
                    as="textarea"
                    name="description"
                    type="textarea"
                    label="Description"
                  />
                  <div className="mb-4">
                    <label
                      htmlFor="gallery"
                      className="block text-sm text-black"
                    >
                      Gallery
                    </label>
                    <input
                      type="file"
                      id="gallery"
                      name="gallery"
                      className="block w-full px-2 py-1 mt-1 border border-black rounded shadow-sm"
                      multiple
                      onChange={(event) => {
                        setFieldValue("gallery", event.currentTarget.files);
                      }}
                    />
                  </div>

                  <div className="flex space-x-4 font-normal">
                    <button
                      type="reset"
                      className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md   hover:bg-gray-300"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 btn-fill-primary "
                    >
                      {isPending && <Spinner />} Save & Add Facility
                    </button>
                  </div>
                </div>
              </section>

              {/* Google Maps Section */}
              <section className="space-y-4">
                <div className="p-4 bg-white rounded-xl">
                  <h2 className="mb-4 text-lg font-semibold">Google Maps</h2>

                  <div className="grid grid-cols-2 gap-4">
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
                    className="flex items-center justify-center w-full h-64 text-black bg-gray-200"
                    role="img"
                    aria-label="Google Maps Placeholder"
                  >
                    Google Maps Placeholder
                  </div>
                </div>
                {data && (
                  <DetailFacilitySection
                    dataHomestay={data}
                    id={id}
                    refetchHomestay={refetch}
                  />
                )}
              </section>
            </>
          </Form>
        )}
      </Formik>
    </>
  );
};
