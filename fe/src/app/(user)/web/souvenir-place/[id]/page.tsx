import SouvenirPage from "@/components/web/object/SouvenirPage";
import { DynamicPageProps } from "@/types/props/DynamicPageProps";
import React from "react";

type Props = DynamicPageProps;

export default async function Souvenir({ params }: Props) {
  const { id } = await params;
  return <SouvenirPage id={id} />;
}
