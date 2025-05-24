import React from "react";
import Button from "../common/Button";
import { FaCircleXmark } from "react-icons/fa6";
import { useWebRightSection } from "@/hooks/useWebRightSection";
import { motion } from "framer-motion";
import { fadeMotion } from "@/utils/common/motionVariants";
import { Package } from "./explore/Package";

const TourismPackage = () => {
  const { togglePackage } = useWebRightSection();
  return (
    <motion.section
      className={`  p-5 space-y-4 bg-white rounded-xl overflow-clip`}
      layoutId="rightSectionWeb"
      {...fadeMotion}
    >
      <Package title="Tourism Package" />
      <Button
        Icon={FaCircleXmark}
        text="close"
        onClick={togglePackage}
        className="p-1"
        variant={"primary"}
      />
    </motion.section>
  );
};

export default TourismPackage;
