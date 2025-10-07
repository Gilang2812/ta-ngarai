import { ContentWrapper } from "@/components/common/ContentWrapper";
import DetailPackagePage from "@/components/dashboard/DetailPackage/DetailPackagePage";
import { DynamicPageProps } from "@/types/props/DynamicPageProps";
import React from "react";

const DetailPackage = async ({ params }: DynamicPageProps) => {
  const { id } = await params;
  return (
    <ContentWrapper>
      <DetailPackagePage id={id} />
    </ContentWrapper>
  );
};

export default DetailPackage;
