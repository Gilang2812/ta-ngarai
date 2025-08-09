import ModifyPackagePage from "@/components/web/extend/ModifyPackagePage";
import React from "react";

const ExtendPackage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <ModifyPackagePage type="extend" id={id} />;
};

export default ExtendPackage;
