import { cn } from "@/utils/common/cn";
import React, { ComponentProps, FC } from "react";

export const ContentWrapper: FC<ComponentProps<"section">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className={cn("grid grid-cols-12 gap-6", className)} {...props}>
      {children}
    </section>
  );
};
