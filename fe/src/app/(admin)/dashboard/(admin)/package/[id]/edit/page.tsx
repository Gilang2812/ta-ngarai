import { ContentWrapper } from "@/components/common/ContentWrapper";
import EditPackagePage from "@/components/dashboard/DetailPackage/EditPackagePage";
import { DynamicPageProps } from "@/type/props/DynamicPageProps";
import React from "react";

const EditPackage = async ({ params }: DynamicPageProps) => {
  const id = (await params).id;
  return (
    <ContentWrapper>
      <EditPackagePage id={id} />
    </ContentWrapper>
  );
};

export default EditPackage;
