"use client";
import React from "react";
import { FormInput } from "@/components/inputs/FormInput";
import { Form, Formik } from "formik";
import Button from "../common/Button";
import { useManageUpdateCraft } from "@/hooks/useManageUpdateCraft";
import ManagementSkeletonLoader from "../loading/ManagementSkeletonLoader";
import FilePondComponent from "../common/Filepond";
import { craftVariantSchema } from "@/type/schema/CraftSchema";
import Link from "next/link";
import { Spinner } from "flowbite-react";

type Props = {
  id: string;
};

export const EditCraftForm = ({ id }: Props) => {
  const {
    crafts,
    isLoading,
    variant,
    initialValues,
    handleUpdateVariant,
    isPending,
  } = useManageUpdateCraft(id);
  if (isLoading) return <ManagementSkeletonLoader />;
  return (
    <>
      <section className="mb-10">
        <h2>{`Edit ${variant?.craft.name} ${variant?.name}`}</h2>
      </section>
      <section className="min-w-[300px]">
        <Formik
          initialValues={initialValues}
          validationSchema={craftVariantSchema}
          onSubmit={handleUpdateVariant}
        >
          <Form className=" gap-4 grid  lg:grid-cols-5 ">
            <section className="order-2 lg:order-1 lg:col-span-3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <FormInput label="Craft" as="select" name="id_craft">
                    {crafts?.map((craft) => (
                      <option key={craft.id} value={craft.id}>
                        {craft.name}
                      </option>
                    ))}
                  </FormInput>
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
                    <FormInput label="Weight (gram)" type="float" name="weight" min="0" />
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
                <Button type="submit">{`${
                  isPending ? <Spinner /> : "Save Changes"
                }`}</Button>
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
