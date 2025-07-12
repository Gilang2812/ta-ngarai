
import { CraftVariantGallery } from "@/type/schema/CraftSchema";
import React from "react";
import ImgCraft from "../common/ImgCraft";
import { motion } from "framer-motion";

type Props = {
  data: CraftVariantGallery[];
  selectedImg: string;
  setSelectedImg: (url: string) => void;
};

const DetailCraftThubnails = ({ data, selectedImg, setSelectedImg }: Props) => {
  return (
    <div className="group grid grid-cols-4 gap-3">
      {data.map((thumb, index) => (
        <button
          key={thumb.id}
          onClick={() => setSelectedImg(thumb.url)}
          className={`relative aspect-square   rounded-xl transition-all duration-300 hover:shadow hover:shadow-yellow-500`}
        >
          {thumb.url === selectedImg && (
            <motion.span
              layoutId="border"
              className="absolute border-2 h-full rounded-xl    w-full left-0    border-indigo-500 ring-1 ring-indigo-300 shadow-lg"
            ></motion.span>
          )}
          <ImgCraft
            className="w-full rounded-xl"
            src={thumb.url}
            width={50}
            height={50}
            alt={`thumbnails${index}`}
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
};

export default DetailCraftThubnails;
