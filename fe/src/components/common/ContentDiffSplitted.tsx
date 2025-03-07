import React, { FC } from "react";
import { ContentWrapper } from "./ContentWrapper";
import { LeftChildrenContent } from "./LeftChildrenContent";
import { RightChildrenContent } from "./RightChildrenContent";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};
export const ContentDiffSplitted: FC<Props> = ({ left, right }) => {
  return (
    <ContentWrapper>
      <LeftChildrenContent>{left}</LeftChildrenContent>
      <RightChildrenContent>{right}</RightChildrenContent>
    </ContentWrapper>
  );
};
