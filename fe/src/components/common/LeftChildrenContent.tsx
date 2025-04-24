import React, { FC } from "react";
type Props = {
  children: React.ReactNode;
};
export const LeftChildrenContent: FC<Props> = ({ children }) => {
  return (
    <article className="h-full col-span-12 lg:col-span-8 ">
      <div className="space-y-4 rounded-lg">
      {children}
      </div>
    </article>
  );
};
