"use client";
import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import React from "react";
import MarketplaceForm from "../marketplace/MarketplaceForm";

const NoStoreSection = () => {
  return (
    <SingleContentWrapper>
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Create Store
        </h2>
        <Button variant={"primary"}>Cancel</Button>
      </header>
      <MarketplaceForm />
    </SingleContentWrapper>
  );
};

export default NoStoreSection;
