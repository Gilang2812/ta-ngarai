"use client";
import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import React from "react";
import MarketplaceForm from "./MarketplaceForm";
import { FormMarketplace } from "@/types/schema/MarketplaceSchema";
import Link from "next/link";
import { ROUTES } from "@/data/routes";

export const FormStoreSection = ({
  existingMarketplace,
}: {
  existingMarketplace?: FormMarketplace;
}) => {
  return (
    <SingleContentWrapper className="min-h-fit">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-lg capitalize font-semibold text-gray-900 mb-4">
          {existingMarketplace ? "Edit" : "Create"} Store
        </h2>
        <Button asChild variant={"primary"}>
          <Link href={ROUTES.MARKETPLACE}>Cancel</Link>
        </Button>
      </header>
      <MarketplaceForm existingMarketplace={existingMarketplace} />
    </SingleContentWrapper>
  );
};
