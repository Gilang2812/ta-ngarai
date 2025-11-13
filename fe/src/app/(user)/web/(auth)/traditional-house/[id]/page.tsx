import TraditionalHousePage from "@/components/web/object/TraditionalHousePage";
import { DynamicPageProps } from "@/types/props/DynamicPageProps";
import React from "react";

type Props = DynamicPageProps;

export default async function TraditionalHouse({ params }: Props) {
  const { id } = await params;
  return <TraditionalHousePage id={id} />;
}
