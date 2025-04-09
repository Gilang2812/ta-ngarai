import { cn } from "@/utils/common/cn";
import React from "react";

export const CheckBoxInput = ({className, ...props }: React.ComponentProps<'input'>) => {
  return (
    <input
      className={cn("rounded outline-none checked:bg-primary focus:border-primary focus:outline-transparent focus:ring-transparent ring-blue-500 ", className)}
      type="checkbox"
      {...props}
    />
  );
};
