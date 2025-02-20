import React, { FC } from "react";
import { ContentWrapper } from "./ContentWrapper";
import { EqualsContentChildren } from "./EqualsContentChildren";
type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};
export const ContentSplitted: FC<Props> = ({ left, right }) => {
  return (
    <ContentWrapper>
      <EqualsContentChildren>{left}</EqualsContentChildren>
      <EqualsContentChildren>{right}</EqualsContentChildren>
    </ContentWrapper>
  );
};
