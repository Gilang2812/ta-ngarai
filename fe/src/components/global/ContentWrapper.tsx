import React, { FC } from "react";

type Props = {
  children?: React.ReactNode;
};
export const ContentWrapper: FC<Props> = ({ children }) => {
  return <section className="grid grid-cols-12 gap-6">{children}</section>;
};
