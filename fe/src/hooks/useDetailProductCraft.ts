import { CraftCartForm } from "@/type/schema/CraftCartSchema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useOrderCraft } from "./useOrderCraft";
import { useFetchOrderDetailCraft } from "@/features/detailCraft/useFetchOrderDetailCraft";
import { DetailCraftOrderResponse } from "@/type/schema/DetailCraftSchema";

export const useDetailProductCraft = (id: string[], idVariant: string) => {
  const searchParms = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const {
    handleSubmit,
    actionRef,
    isCraftPending,
    isChecking,
    handleBuy,
    handleCart,
  } = useOrderCraft();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParms.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParms]
  );

  const initialValues: CraftCartForm = {
    craft_variant_id: idVariant,
    id_souvenir_place: id[1],
    jumlah: 1,
  };

  const { data: crafts, isLoading } = useFetchOrderDetailCraft(id);

  const initalDetailCraft =
    crafts?.find(
      (vr) => vr.craft_variant_id.toLowerCase() === idVariant.toLowerCase()
    ) || crafts?.[0];

  const [selectedDetailCraft, setSelectedDetailCraft] = useState<
    DetailCraftOrderResponse | undefined
  >(initalDetailCraft);

  const mainImage = selectedDetailCraft?.craftGalleries?.[0]?.url || "";
  const [selectedImage, setSelectedImage] = useState<string>(mainImage);

  useEffect(() => {
    if (initalDetailCraft && !selectedDetailCraft)
      setSelectedDetailCraft(initalDetailCraft);
    if (mainImage) setSelectedImage(mainImage);
  }, [initalDetailCraft, mainImage, selectedDetailCraft]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (image: string, index: number) => {
    setSelectedImage(image);
    setActiveIndex(index);
  };

  const handlePrevImageButton = () => {
    const maxLength = (selectedDetailCraft?.craftGalleries?.length ?? 1) - 1;
    const imageIndex = activeIndex === 0 ? maxLength : activeIndex - 1;
    setActiveIndex((prev) => {
      if (prev === 0) {
        return (selectedDetailCraft?.craftGalleries?.length ?? 1) - 1;
      }
      return Math.max(0, prev - 1);
    });

    setSelectedImage(
      selectedDetailCraft?.craftGalleries?.[imageIndex]?.url || ""
    );
  };

  const handleNextImageButton = () => {
    const maxLength = (selectedDetailCraft?.craftGalleries?.length ?? 1) - 1;
    const imageIndex = activeIndex === maxLength ? 0 : activeIndex + 1;

    setActiveIndex((prev) => {
      if (prev === maxLength) {
        return 0;
      }
      return Math.min(maxLength, prev + 1);
    });

    setSelectedImage(
      selectedDetailCraft?.craftGalleries?.[imageIndex]?.url || ""
    );
  };

  const handleSelectedDetailCraft = (detailCraft: DetailCraftOrderResponse) => {
    setSelectedDetailCraft(detailCraft);
    router.push(
      `${pathName}?${createQueryString("idvr", detailCraft.craft_variant_id)}`
    );
  };

  return {
    crafts,
    isLoading,
    selectedDetailCraft,
    selectedImage,
    setSelectedDetailCraft: handleSelectedDetailCraft,
    activeIndex,
    handleThumbnailClick,
    handleNextImageButton,
    initialValues,
    handlePrevImageButton,
    actionRef,
    isCraftPending,
    isChecking,
    handleSubmit,
    handleBuy,
    handleCart,
  };
};
