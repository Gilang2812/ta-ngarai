import React from "react";
import { InfoSection } from "@/components/web/package/moreInfoPackage/InfoSection";
import { ContentWrapper } from "@/components/common/ContentWrapper";

export default async function MoreInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <ContentWrapper>
      <InfoSection id={id} />
    </ContentWrapper>
  );
}
