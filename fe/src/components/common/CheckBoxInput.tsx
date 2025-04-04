import React from "react";

export const CheckBoxInput = ({ ...props }: React.ComponentProps<'input'>) => {
  return (
    <input
      className="rounded outline-none checked:bg-primary focus:border-primary focus:outline-transparent focus:ring-transparent ring-blue-500 "
      type="checkbox"
      {...props}
    />
  );
};
