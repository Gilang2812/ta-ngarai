import { useTools } from "@/hooks/useTools";
import React from "react";
import { Package } from "./explore/Package";
import Button from "../common/Button";
import { FaCircleXmark } from "react-icons/fa6";

const TourismPackage = () => {
  const { open,toggleOpen } = useTools();
  return (
    <section
      className={`${
        !open && "hidden"
      } p-5 space-y-4 bg-white rounded-xl overflow-clip`}
    >
      <Package title="Tourism Package" />
      <Button
        Icon={FaCircleXmark}
        text="close"
        onClick={toggleOpen}
        className="p-1"
        variant={"primary"}
      />
    </section>
  );
};

export default TourismPackage;
