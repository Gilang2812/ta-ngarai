"use client";
import React from "react";
import { FormInput } from "@/components/inputs/FormInput";
import { Form, Formik } from "formik";
import Button from "../common/Button";
import { useManageUpdateCraft } from "@/hooks/useManageUpdateCraft";
import ManagementSkeletonLoader from "../loading/ManagementSkeletonLoader";
import FilePondComponent from "../common/Filepond";
import Link from "next/link";
import { Spinner } from "flowbite-react";
import { detailCraftSchema } from "@/type/schema/DetailCraftSchema";

type Props = {
  id: string;
};

export const EditCraftForm = ({ id }: Props) => {
  const {
    isLoading,
    detailCraft,
    initialValues,
    handleUpdateDetailCraft,
    isPending,
  } = useManageUpdateCraft(id);
  if (isLoading) return <ManagementSkeletonLoader />;
  return (
    <>
      <section className="mb-10">
        <h2>
          Edit &nbsp;
          <span className="text-white bg-primary capitalize py-1 rounded-full px-2 font-normal">
            {detailCraft?.variant?.craft?.name} {detailCraft?.variant?.name}
          </span>
        </h2>
      </section>
      <section className="min-w-[300px]">
        <Formik
          initialValues={initialValues}
          onSubmit={handleUpdateDetailCraft}
          validationSchema={detailCraftSchema}
          enableReinitialize={true}
        >
          <Form className=" gap-4 grid  lg:grid-cols-5 ">
            <section className="order-2 lg:order-1 lg:col-span-3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <FormInput
                    label="Craft ID"
                    type="text"
                    name="craft_variant_id"
                  />
                </div>
                <div>
                  <FormInput label="Name" type="text" name="name" />
                </div>
                <div>
                  <FormInput label="Price" type="number" name="price" min="0" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <FormInput
                    label="Weight (gram)"
                    type="number"
                    name="weight"
                    min="0"
                  />
                </div>

                <div>
                  <FormInput label="Modal" type="number" name="modal" min="0" />
                </div>

                <div>
                  <FormInput label="Stock" type="number" name="stock" min="0" />
                </div>
              </div>
              <div>
                <FormInput
                  as="textarea"
                  label="Description"
                  id="description"
                  name="description"
                  rows="4"
                />
              </div>
              <div className="flex gap-2 justify-end items-center">
                <Link
                  href={`./`}
                  className=" p-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition-colors  duration-200"
                >
                  back
                </Link>
                <Button type="submit">
                  {isPending ? <Spinner /> : "Save Changes"}
                </Button>
              </div>
            </section>
            <section className=" order-1 lg:order-2  w-full lg:col-span-2 space-y-6">
              <FilePondComponent />
            </section>
          </Form>
        </Formik>
      </section>
    </>
  );
};
