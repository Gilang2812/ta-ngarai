"use client";

import { cn } from "@/utils/common/cn";
import { motion } from "framer-motion";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const SingleContentWrapper: FC<Props> = ({ children, className }) => {
  return (
    <motion.section
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
      className={cn(
        `  min-w-fit to-white p-5 min-h-fit via-white via-[4%] from-primary/80 from-[3.6%]  bg-gradient-to-br rounded-xl`,
        className
      )}
    >
      {children}
    </motion.section>
  );
};
