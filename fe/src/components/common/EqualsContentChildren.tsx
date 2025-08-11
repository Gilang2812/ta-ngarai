import { cn } from "@/utils/common/cn";
import React, { ComponentProps, FC } from "react";

type Props = ComponentProps<"article"> & {
  children: React.ReactNode;
};
export const EqualsContentChildren: FC<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <article
      className={cn(
        "h-full  col-span-12 lg:col-span-6 space-y-4 rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
};
