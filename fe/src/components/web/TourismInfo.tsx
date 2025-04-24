"use client";

import { TourismGalleries } from "@/components/web/TourismGalleries";
import { TourismData } from "@/components/web/TourismData";
import { ContentHeader } from "../common/ContentHeader";
import { motion } from "framer-motion";
import { fadeMotion } from "@/utils/common/motionVariants";
import { ButtonSearchArround } from "../common/ButtonSearchArround";
import { useWebRightSection } from "@/hooks/useWebRightSection";

export default function TourismInfo() {
  const { toggleAround, aroundOpen } = useWebRightSection();
  return (
    <motion.div {...fadeMotion} className={`space-y-2`}>
      <ContentHeader text="nagari koto gadang" />
      <section className="overflow-x-hidden max-h-[550px]">
        <TourismGalleries />
        <TourismData />
      </section>
      <ButtonSearchArround onClick={toggleAround} search={aroundOpen} />
    </motion.div>
  );
}
