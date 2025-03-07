import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};
export const SinggleContentWrapper: FC<Props> = ({ children }) => {
  return (
    <section className="p-5 min-w-fit overflow-hidden bg-white rounded-xl">
      {children}
    </section>
  );
};
