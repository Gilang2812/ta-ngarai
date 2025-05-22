"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/craft/Header";
import { ProductImageGallery } from "@/components/craft/ProductImageGallery";
import { MOCK_PRODUCT } from "@/data/craft";
import { ProductInfo } from "@/components/craft/ProductInfo";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";

function ProductDetail() {
  const params = useParams();
  const productId = typeof params.id === "string" ? params.id : "";
  const product = MOCK_PRODUCT;

  //   if (isLoading) {
  //     return (
  //       <div className="min-h-screen flex justify-center items-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  //       </div>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <div className="min-h-screen flex justify-center items-center">
  //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
  //           Error loading product
  //         </div>
  //       </div>
  //     );
  //   }

  //   if (!product) {
  //     return (
  //       <div className="min-h-screen flex justify-center items-center">
  //         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
  //           Product not found
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="container mx-auto px-4 pb-10">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <ProductImageGallery
          mainImage={product.imageUrl}
          thumbnails={product.thumbnails}
          productName={product.name}
        />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <SingleContentWrapper>
      <ProductDetail />
    </SingleContentWrapper>
  );
}
