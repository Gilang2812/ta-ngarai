import React from "react";

type Props = {
  children: React.ReactNode;
};

export const StepFooter: React.FC<Props> = ({ children }) => {
  return (
    <footer className="col-span-2  flex items-center text-lg justify-end gap-4 capitalize">
      {children}
    </footer>
  );
};
