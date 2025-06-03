'use client'
import { motion } from "framer-motion";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const SingleContentWrapper: FC<Props> = ({ children }) => {
  return (
    <motion.section layout className="p-5 min-w-fit  overflow-hidden to-white via-white via-[4%] from-primary from-[3.6%]  bg-gradient-to-br rounded-xl">
      {children}
    </motion.section>
  );
};
