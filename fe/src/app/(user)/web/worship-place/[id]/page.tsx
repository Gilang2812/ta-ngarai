import WorshipPage from "@/components/web/object/WorshipPage";
import { DynamicPageProps } from "@/type/props/DynamicPageProps";
import React from "react";

type Props = DynamicPageProps;

export default async function worship({ params }: Props) {
  const { id } = await params;
  return <WorshipPage id={id} />;
}
