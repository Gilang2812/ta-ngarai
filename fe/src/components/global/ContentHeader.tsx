import React, { FC } from "react";

type Props = {
  text: string;
};
export const ContentHeader: FC<Props> = ({ text }) => {
  return (
    <header className="capitalize py-5 text-lg text-center">
      <h1>{text}</h1>
    </header>
  );
};
