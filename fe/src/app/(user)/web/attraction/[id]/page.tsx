import AttractionPage from "@/components/web/object/AttractionPage";
import { DynamicPageProps } from "@/types/props/DynamicPageProps";
import React from "react";

type Props = DynamicPageProps;

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <AttractionPage id={id} />;
}
