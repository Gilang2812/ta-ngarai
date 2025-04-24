"use client";

import { useState } from "react";
import { Around } from "@/components/web/explore/Around";
import { Package } from "@/components/web/explore/Package";
import { motion } from "framer-motion";
import { fadeMotion } from "@/utils/common/motionVariants";
import { ButtonSearchArround } from "@/components/common/ButtonSearchArround";

export const PackageSection = ({ title }: { title: string }) => {
  const [search, setSearch] = useState(false);

  const handleSearchToggle = () => {
    setSearch(!search);
  };

  return (
    <motion.article
      className="col-span-4 p-5 bg-white rounded-lg"
      {...fadeMotion}
    >
      {search ? (
        <Around handleCloseAround={handleSearchToggle} isAroundOpen={search} />
      ) : (
        <>
          <Package title={title} />
          <footer className="pt-6">
            <ButtonSearchArround onClick={handleSearchToggle} search={search} />
          </footer>
        </>
      )}
    </motion.article>
  );
};
