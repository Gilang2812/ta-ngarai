"use client";
import { cn } from "@/utils/common/cn";
import { motion } from "framer-motion";
import { ComponentProps, useRef, useState, useEffect } from "react";

type TableProps = Omit<
  ComponentProps<"table">,
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDragStart"
  | "onDrag"
  | "onDragEnd"
>;

export const Table = ({ children, className, ...props }: TableProps) => {
  const ref = useRef<HTMLTableElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  // ukur ulang height setiap kali children berubah
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [children]);

  return (
    <motion.div
      animate={{ height }}
      className="min-h-fit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <table
        ref={ref}
        className={cn("min-w-fit w-full [&_td]:p-2 [&_th]:p-2", className)}
        {...props}
      >
        {children}
      </table>
    </motion.div>
  );
};
