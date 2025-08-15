"use client";

import FormNewHomestay from "@/components/homestay/new/FormNewHomestay";
import { useNewHomestay } from "@/hooks/useNewHomestay";
import { createHomestaySchema } from "@/validation/homestaySchema";
import { Formik } from "formik";

const NewHomestay = ({}) => {
  const { isPending, initialValues, handleSubmit } = useNewHomestay();
  return (
    <main className="p-4">
      <Formik initialValues={initialValues} validationSchema={createHomestaySchema} onSubmit={handleSubmit}>
        <FormNewHomestay isPending={isPending} />
      </Formik>
    </main>
  );
};

export default NewHomestay;
