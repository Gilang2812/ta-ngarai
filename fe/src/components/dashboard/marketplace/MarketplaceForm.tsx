import useFormMarketplace from "@/hooks/useFormMarketplace";
import {
  FormMarketplace,
  marketplaceSchema,
} from "@/types/schema/MarketplaceSchema";
import { Formik } from "formik";
import React from "react";
import MarketPlaceFormSection from "./MarketPlaceFormSection";

const MarketplaceForm = ({
  existingMarketplace,
  callback
}: {
  existingMarketplace?: FormMarketplace;
  callback?: () => void
}) => {
  const { initialValues, isPending, handleSubmit } =
    useFormMarketplace(existingMarketplace, callback);

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
        <MarketPlaceFormSection isPending={isPending} id={initialValues.id} />
      </Formik>
    </div>
  );
};

export default MarketplaceForm;
