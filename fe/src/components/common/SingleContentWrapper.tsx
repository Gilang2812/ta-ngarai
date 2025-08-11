"use client";

import { cn } from "@/utils/common/cn";
import { motion } from "framer-motion";
import React, { FC, useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const SingleContentWrapper: FC<Props> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  // ukur ulang height setiap kali children berubah
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [children]);

  return (
    <motion.section
      animate={{ height }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
      className={cn(
        `  min-w-fit to-white via-white via-[4%] from-primary/80 from-[3.6%]  bg-gradient-to-br rounded-xl`,
        className
      )}
    >
      <div className="p-5" ref={ref}>{children}</div>
    </motion.section>
  );
};
