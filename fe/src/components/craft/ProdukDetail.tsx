"use client";

import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { useDetailProductCraft } from "@/hooks/useDetailProductCraft";
import { useSearchParams } from "next/navigation";

function ProductDetail({ id }: { id: string }) {
  const searchParms = useSearchParams();
  const idVariant = searchParms.get("idvr") || "";
  const {
    isLoading,
    selectedImage,
    selectedVariant,
    craft,
    activeIndex,
    handleNextImageButton,
    handlePrevImageButton,
    handleThumbnailClick,
    setSelectedVariant,
    initialValues,
    actionRef,
    handleSubmit
  } = useDetailProductCraft(id, idVariant);

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
    <div className="container mx-auto px-4 pb-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Souvenir</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {selectedVariant && (
          <ProductImageGallery
            selectedVariant={selectedVariant}
            selectedImage={selectedImage}
            activeIndex={activeIndex}
            handleNextImageButton={handleNextImageButton}
            handlePrevImageButton={handlePrevImageButton}
            handleThumbnailClick={handleThumbnailClick}
          />
        )}
        {craft && selectedVariant && (
            <ProductInfo
              setSelectedVariant={setSelectedVariant}
              selectedVariant={selectedVariant}
              craft={craft}
              initialValues={initialValues}
              actionRef={actionRef}
              handleSubmit={handleSubmit}
            />
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
