"use client";
import React from "react";
import ImgCraft from "../common/ImgCraft";
import Button from "../common/Button";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { DetailCraftManagementResponse } from "@/type/schema/DetailCraftSchema";
import { baseUrl } from "@/lib/baseUrl";

interface ProductImageGalleryProps {
  selectedImage: string | null;
  selectedDetailCraft: DetailCraftManagementResponse;
  activeIndex: number;
  handleThumbnailClick: (url: string, index: number) => void;
  handlePrevImageButton: () => void;
  handleNextImageButton: () => void;
}
export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  selectedImage,
  selectedDetailCraft,
  activeIndex,
  handleNextImageButton,
  handlePrevImageButton,
  handleThumbnailClick,
}) => {
  return (
    <div className="w-full">
      <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden">
        {/* <ImgCraft
          src={selectedImage ? selectedImage : ""}
          alt={selectedDetailCraft.variant.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 500px"
          priority
        /> */}
        <AnimatePresence mode="wait">
          <motion.img
            layoutId="selectedImage"
            alt="main image"
            src={`${baseUrl}/${selectedImage ? selectedImage : ""}`}
            className="w-full aspect-square shadow"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>
      <div className="relative border p-4 rounded-xl">
        <Button
          className="absolute left-4 top-1/2 -translate-y-1/2  rounded-full shadow p-1 z-10"
          onClick={handlePrevImageButton}
        >
          <MdOutlineArrowBackIosNew />
        </Button>
        <div className="flex overflow-x-auto scrollbar-hide gap-2 px-12">
          {selectedDetailCraft?.craftGalleries?.map((thumb, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5 }}
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 cursor-pointer border-4 rounded-md overflow-hidden ${
                activeIndex === index ? "border-blue-500" : "border-gray-200"
              }`}
              onClick={() => handleThumbnailClick(thumb.url, index)}
            >
              <ImgCraft
                src={thumb.url}
                alt={`${selectedDetailCraft.variant.name} thumbnail ${
                  index + 1
                }`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </motion.div>
          ))}
        </div>
        <Button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-fit  rounded-full shadow p-1 z-10"
          onClick={handleNextImageButton}
        >
          <MdArrowForwardIos />
        </Button>
      </div>
    </div>
  );
};
