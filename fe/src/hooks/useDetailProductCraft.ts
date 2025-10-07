import { CraftCartForm } from "@/types/schema/CraftCartSchema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useOrderCraft } from "./useOrderCraft";
import { useFetchOrderDetailCraft } from "@/features/detailCraft/useFetchOrderDetailCraft";
import {
  DetailCraftManagementResponse,
  DetailCraftOrderResponse,
} from "@/types/schema/DetailCraftSchema";
import useProdukGallery from "./useProdukGallery";

export const useDetailProductCraft = ({
  id_craft,
  id_souvenir_place,
  idVariant,
}: {
  id_craft: string;
  id_souvenir_place: string;
  idVariant: string;
}) => {
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

  const initialValues: CraftCartForm = {
    craft_variant_id: idVariant,
    id_souvenir_place: id_souvenir_place,
    jumlah: 1,
  };

  const { data: crafts, isLoading } = useFetchOrderDetailCraft({
    id_craft,
    id_souvenir_place,
  });

  const initalDetailCraft =
    crafts?.find(
      (vr) => vr.craft_variant_id.toLowerCase() === idVariant.toLowerCase()
    ) || crafts?.[0];

  const mainImage = selectedDetailCraft?.craftGalleries?.[0]?.url || "";

  useEffect(() => {
    if (initalDetailCraft && !selectedDetailCraft) {
      setSelectedDetailCraft(initalDetailCraft);
    }
  }, [initalDetailCraft, selectedDetailCraft, setSelectedDetailCraft]);

  useEffect(() => {
    if (mainImage) {
      setSelectedImage(mainImage);
    }
  }, [mainImage, setSelectedImage]);

  const handleSelectedDetailCraft = (
    detailCraft: DetailCraftOrderResponse | DetailCraftManagementResponse
  ) => {
    setSelectedDetailCraft(detailCraft);
    router.push(
      `${pathName}?${createQueryString("idvr", detailCraft.craft_variant_id)}`
    );
  };

  return {
    crafts,
    isLoading,
    selectedDetailCraft: selectedDetailCraft as DetailCraftOrderResponse,
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
