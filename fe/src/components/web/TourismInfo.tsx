"use client";

import { TourismGalleries } from "@/components/web/TourismGalleries";
import { TourismData } from "@/components/web/TourismData";
import { ContentHeader } from "../common/ContentHeader";
import { motion } from "framer-motion";
import { fadeMotion } from "@/utils/common/motionVariants";
import { ButtonSearchArround } from "../common/ButtonSearchArround";
import { useWebRightSection } from "@/hooks/useWebRightSection";
import { FaRoute } from "react-icons/fa6";
import Button from "../common/Button"; 
import useTravelRoute from "@/hooks/useTravelRoute";

export default function TourismInfo() {
  const { toggleAround, aroundOpen,  } = useWebRightSection();
  const { handleCreateRoute } = useTravelRoute();
  return (
    <motion.div {...fadeMotion} className={`space-y-2`}>
      <ContentHeader text="nagari koto gadang" />
      <section className="overflow-x-hidden max-h-[550px]">
        <TourismGalleries />
        <TourismData />
      </section>
      <ButtonSearchArround onClick={toggleAround} search={aroundOpen} />
      <Button variant={"success"} onClick={handleCreateRoute} type="button">
        <FaRoute /> Create Travel Route
      </Button>
    </motion.div>
  );
}
