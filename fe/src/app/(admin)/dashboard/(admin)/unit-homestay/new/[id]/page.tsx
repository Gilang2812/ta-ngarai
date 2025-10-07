import ManageUnitHomestay from "@/components/homestay/detail/ManageUnitHomestay";
import { DynamicPageProps } from "@/types/props/DynamicPageProps";
import React from "react";

const ManageDetailHomestay = async ({ params }: DynamicPageProps) => {
  const { id } = await params;
  return (
    <div>
      <ManageUnitHomestay id={id} />
    </div>
  );
};

export default ManageDetailHomestay;
