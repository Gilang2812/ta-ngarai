import React, { FC } from "react";
type Props = {
  children: React.ReactNode;
};
export const RightChildrenContent: FC<Props> = ({ children }) => {
  return (
    <article className="h-full col-span-12 lg:col-span-4 space-y-4 rounded-lg">
      {children}
    </article>
  );
};
