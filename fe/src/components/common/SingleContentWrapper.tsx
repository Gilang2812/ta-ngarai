"use client";

import { cn } from "@/utils/common/cn";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const SingleContentWrapper: FC<Props> = ({ children, className }) => {
  return (
    <section
      className={cn(
        `p-5 min-w-fit overflow-hidden to-white via-white via-[4%] from-primary/80 from-[3.6%]  bg-gradient-to-br rounded-xl`,
        className
      )}
    >
      {children}
    </section>
  );
};
