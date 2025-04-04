import React from "react";

export const ButtonPrimary = ({
  children,
  onClick, 
  expanded
}: {
  children: React.ReactNode;
  onClick: () => void; 
  expanded:boolean
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex flex-nowrap items-center gap-4 px-3 ${expanded?" max-w-0":"max-w-96"} min-w-fit   py-2 btn-primary   overflow-hidden`}
    >
      {children}
    </button>
  );
};
