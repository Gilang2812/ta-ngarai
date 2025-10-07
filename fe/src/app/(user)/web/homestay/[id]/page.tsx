import { ContentWrapper } from "@/components/common/ContentWrapper";
import { DetailHomestaySection } from "@/components/homestay/DetailHomestaySection";
import { DynamicPageProps } from "@/types/props/DynamicPageProps";
import React from "react";

type Props = DynamicPageProps;

export default async function Homestay({ params }: Props) {
  const { id } = await params;
  return (
    <ContentWrapper>
      <DetailHomestaySection id={id} />
    </ContentWrapper>
  );
}
