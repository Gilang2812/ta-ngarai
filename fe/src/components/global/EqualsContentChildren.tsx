import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};
export const EqualsContentChildren: FC<Props> = ({ children }) => {
  return (
    <article className="h-full  col-span-12 lg:col-span-6 space-y-4 rounded-lg">
      {children}
    </article>
  );
};


