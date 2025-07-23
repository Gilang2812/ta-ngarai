"use client";

import { useEffect } from "react";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { useDetailProductCraft } from "@/hooks/useDetailProductCraft";
import { useSearchParams } from "next/navigation";

function ProductDetail({ id }: { id: string[] }) {
  const searchParms = useSearchParams();
  const idVariant = searchParms.get("idvr") || "";
  const {
    isLoading,
    selectedImage,
    selectedDetailCraft,
    activeIndex,
    handleNextImageButton,
    handlePrevImageButton,
    handleThumbnailClick,
    setSelectedDetailCraft,
    initialValues,
    handleCart,
    handleBuy,
    handleSubmit,
    crafts,
  } = useDetailProductCraft(id, idVariant);

  useEffect(() => {
    console.log("Active Index:", activeIndex);
  }, [activeIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center">
  //       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
  //         Error loading product
  //       </div>
  //     </div>
  //   );
  // }

  //   if (!product) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center">
  //       <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
  //         Product not found
  //       </div>
  //     </div>
  //   );
  //   }

  return (
    selectedDetailCraft &&
    crafts && (
      <div className="container mx-auto px-4 pb-10">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Souvenir</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <ProductImageGallery
            selectedDetailCraft={selectedDetailCraft}
            selectedImage={selectedImage}
            activeIndex={activeIndex}
            handleNextImageButton={handleNextImageButton}
            handlePrevImageButton={handlePrevImageButton}
            handleThumbnailClick={handleThumbnailClick}
          />

          <ProductInfo
            setSelectedDetailCraft={setSelectedDetailCraft}
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            handleCart={handleCart}
            handleBuy={handleBuy}
            crafts={crafts}
            data={{
              craftId: selectedDetailCraft.variant.id_craft,
              craftName: `${selectedDetailCraft.variant.craft.name} ${selectedDetailCraft.variant.name}`,
              price: selectedDetailCraft.price,
              description: selectedDetailCraft.description,
              stock: selectedDetailCraft.stock,
              craftVariantId: selectedDetailCraft.craft_variant_id,
              rating:
                selectedDetailCraft.items.reduce(
                  (acc, curr) => acc + (curr.review_rating || 0),
                  0
                ) /
                  selectedDetailCraft.items.filter((item) => item.review_rating)
                    .length || 0,
              sold:
                selectedDetailCraft.items.reduce(
                  (acc, curr) => acc + curr.jumlah,
                  0
                ) || 0,
              storeName: selectedDetailCraft.souvenirPlace.name,
            }}
          />
        </div>
      </div>
    )
  );
}

export default ProductDetail;
