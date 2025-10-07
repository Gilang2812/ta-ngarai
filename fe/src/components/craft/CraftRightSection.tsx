import { DetailCraftManagementResponse } from "@/types/schema/DetailCraftSchema";
import { SouvenirPlaceSchema } from "@/types/schema/PackageSchema";
import { ProductImageGallery } from "./ProductImageGallery";
import useProdukGallery from "@/hooks/useProdukGallery";
import { useEffect } from "react";
import { VariantSelector } from "./VariantSelector";
import Button from "../common/Button";
import { useTools } from "@/hooks/useTools";
import EmptyStore from "./EmptyStore";

type CraftRightSectionProps = {
  selectedStore: SouvenirPlaceSchema & {
    crafts: DetailCraftManagementResponse[];
  };
};
const CraftRightSection: React.FC<CraftRightSectionProps> = ({
  selectedStore,
}) => {
  const {
    selectedImage,
    setSelectedImage,
    activeIndex,
    handleThumbnailClick,
    handlePrevImageButton,
    handleNextImageButton,
    setSelectedDetailCraft,
    selectedDetailCraft,
  } = useProdukGallery();

  const { toggleClose } = useTools();

  const initialCraft = selectedStore?.crafts?.[0];
  useEffect(() => {
    if (initialCraft) {
      setSelectedDetailCraft(initialCraft);
    }
  }, [initialCraft, setSelectedDetailCraft]);
  useEffect(() => {
    if (selectedDetailCraft) {
      setSelectedImage(selectedDetailCraft?.craftGalleries?.[0]?.url || "");
    }
  }, [selectedDetailCraft, setSelectedImage]);
  return (
    <section className="space-y-8">
      {selectedStore?.crafts.length == 0 ? (
        <EmptyStore />
      ) : (
        selectedDetailCraft &&
        selectedImage && (
          <div className="w-full relative border space-y-4 shadow-lg p-4 rounded-lg bg-white">
            <ProductImageGallery
              selectedDetailCraft={selectedDetailCraft}
              selectedImage={selectedImage}
              activeIndex={activeIndex}
              handleNextImageButton={handleNextImageButton}
              handlePrevImageButton={handlePrevImageButton}
              handleThumbnailClick={handleThumbnailClick}
            />
            <VariantSelector
              isFullName={true}
              crafts={selectedStore.crafts}
              selectedDetailCraftId={selectedDetailCraft.craft_variant_id}
              onSelect={setSelectedDetailCraft}
            />
          </div>
        )
      )}
      <Button variant={'primary'} type="button" onClick={toggleClose}>
        Close
      </Button>
    </section>
  );
};

export default CraftRightSection;
