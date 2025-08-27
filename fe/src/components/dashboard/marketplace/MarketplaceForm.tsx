import useFormMarketplace from "@/hooks/useFormMarketplace";
import {
  FormMarketplace,
  marketplaceSchema,
} from "@/type/schema/MarketplaceSchema";
import { Formik } from "formik";
import React from "react";
import MarketPlaceFormSection from "./MarketPlaceFormSection";

const MarketplaceForm = ({
  existingMarketplace,
}: {
  existingMarketplace?: FormMarketplace;
}) => {
  const { initialValues, isPending, handleSubmit } =
    useFormMarketplace(existingMarketplace);

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
