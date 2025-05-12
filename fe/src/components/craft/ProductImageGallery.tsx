"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  mainImage: string;
  thumbnails?: string[];
  productName: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  mainImage,
  thumbnails,
  productName,
}) => {
  const [currentImage, setCurrentImage] = useState(mainImage);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (image: string, index: number) => {
    setCurrentImage(image);
    setActiveIndex(index);
  };

  return (
    <div className="w-full">
      <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden">
        <Image
          src={currentImage}
          alt={productName}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 500px"
          priority
        />
      </div>
      <div className="relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-1 z-10"
          onClick={() => {
            const newIndex = Math.max(0, activeIndex - 1);
            setActiveIndex(newIndex);
            setCurrentImage(thumbnails[newIndex]);
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="flex overflow-x-auto scrollbar-hide gap-2 px-8">
          {thumbnails?.map((thumb, index) => (
            <div
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 cursor-pointer border-2 rounded-md overflow-hidden ${
                activeIndex === index ? "border-blue-500" : "border-gray-200"
              }`}
              onClick={() => handleThumbnailClick(thumb, index)}
            >
              <Image
                src={thumb}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-1 z-10"
          onClick={() => {
            const newIndex = Math.min(thumbnails.length - 1, activeIndex + 1);
            setActiveIndex(newIndex);
            setCurrentImage(thumbnails[newIndex]);
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
