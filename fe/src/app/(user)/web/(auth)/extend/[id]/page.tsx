import ExtendPage from "@/components/web/extend/ExtendPage";
import React from "react";

const ExtendPackage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <ExtendPage type="extend" id={id} />;
};

export default ExtendPackage;
