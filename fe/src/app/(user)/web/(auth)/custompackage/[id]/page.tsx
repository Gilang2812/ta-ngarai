import ModifyPackagePage from "@/components/web/extend/ModifyPackagePage";
import React from "react";

const CustomPackage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <ModifyPackagePage type="custom" id={id} />;
};

export default CustomPackage;
