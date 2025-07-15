import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { baseUrl } from "@/lib/baseUrl";

type Props = { imgCount: number; selectedImg: string };

const DetailCraftMainImage = ({ imgCount, selectedImg }: Props) => {
  return (
    <div className="relative group">
      <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl border-2 border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <AnimatePresence mode="wait">
          <motion.img
            alt="main image"
            key={selectedImg}
            src={`${baseUrl}/${selectedImg}`}
            className="w-full aspect-square shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        <div className="absolute top-4 right-4 z-10">
          <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full font-medium">
            {imgCount} Foto
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailCraftMainImage;
