import EditMarketplacePage from "@/components/dashboard/marketplace/EditMarketplacePage";
import { DynamicPageProps } from "@/type/props/DynamicPageProps";
import React from "react";

export default async function EditMarketplace({ params }: DynamicPageProps) {
  const { id } = await params;
  return <EditMarketplacePage id={id} />;
}
