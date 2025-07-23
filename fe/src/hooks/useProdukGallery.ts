import {
  DetailCraftManagementResponse,
  DetailCraftOrderResponse,
} from "@/type/schema/DetailCraftSchema";
import { useEffect, useState } from "react";

const useProdukGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDetailCraft, setSelectedDetailCraft] = useState<
    DetailCraftManagementResponse | DetailCraftOrderResponse | undefined
  >();

  const handleThumbnailClick = (image: string, index: number) => {
    setSelectedImage(image);
    setActiveIndex(index);
  };
  const maxLength = selectedDetailCraft?.craftGalleries?.length ?? 0;
  const handlePrevImageButton = () => {
    setActiveIndex((prev) => {
      if (prev === 0) {
        return (selectedDetailCraft?.craftGalleries?.length ?? 1) - 1;
      }
      return Math.max(0, prev - 1);
    });
  };

  const handleNextImageButton = () => {
    setActiveIndex((prev) => {
      if (prev === maxLength-1) {
        return 0;
      }
      return Math.min(maxLength-1, prev + 1);
    });
  };

  useEffect(() => {
    setSelectedImage(
      selectedDetailCraft?.craftGalleries?.[activeIndex]?.url || null
    );
  }, [selectedDetailCraft, activeIndex]);

  return {
    selectedImage,
    selectedDetailCraft,
    setSelectedImage,
    activeIndex,
    setActiveIndex,
    handleThumbnailClick,
    handlePrevImageButton,
    handleNextImageButton,
    setSelectedDetailCraft,
  };
};

export default useProdukGallery;
