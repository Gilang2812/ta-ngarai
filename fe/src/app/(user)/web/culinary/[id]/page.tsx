import CulinaryPage from "@/components/web/object/CulinaryPage";
import { DynamicPageProps } from "@/types/props/DynamicPageProps";
import React from "react";

type Props = DynamicPageProps;

export default async function CulinaryPlace({ params }: Props) {
  const { id } = await params;
  return <CulinaryPage id={id} />;
}
