"use client";
import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import React from "react";
import MarketplaceForm from "./MarketplaceForm";
import { FormMarketplace } from "@/type/schema/MarketplaceSchema";

export const FormStoreSection = ({
  existingMarketplace,
  updateSuccess,
}: {
  existingMarketplace?: FormMarketplace;
  updateSuccess?: () => void;
}) => {
  return (
    <SingleContentWrapper>
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-lg capitalize font-semibold text-gray-900 mb-4">
          {existingMarketplace ? "Edit" : "Create"} Store
        </h2>
        <Button variant={"primary"}>Cancel</Button>
      </header>
      <MarketplaceForm
        existingMarketplace={existingMarketplace}
        updateSuccess={updateSuccess}
      />
    </SingleContentWrapper>
  );
};
