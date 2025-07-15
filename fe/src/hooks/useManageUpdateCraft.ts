import { useFetchCraft } from "@/features/dashboard/craft/useFetchCraft";
import { cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useMemo } from "react";
import isEqual from "lodash/isEqual";
import { isSameImages } from "@/utils/common/isSamgeImages";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { useUpdateDetailCraft } from "@/features/detailCraft/useUpdateDetailCraft";
import { useGetDetailCraft } from "@/features/detailCraft/useGetDetailCraft";
import {
  DetailCraftManagementResponse,
  DetailCraftSchema,
} from "@/type/schema/DetailCraftSchema";

export const useManageUpdateCraft = (id: string) => {
  const {
    data: detailCraft,
    isLoading: detailCraftLoading,
    refetch: refetchVariant,
  } = useGetDetailCraft<DetailCraftManagementResponse>({
    craft_variant_id: id,
    include: ["craft", "craftGalleries"],
  });
  const { data: crafts, isLoading: craftLoading } = useFetchCraft();
  const { mutate: updateDetailCraft, isPending } = useUpdateDetailCraft({
    onSuccess: () => {
      cornerAlert("variasi kerajinan berhasil diperbarui");
      refetchVariant();
    },
  });
  const images = useMemo(() => {
    if (!detailCraft?.craftGalleries?.length) return [];
    const urls = detailCraft.craftGalleries.map((image) => image.url);
    return formatImageUrls(urls);
  }, [detailCraft]);

  const initialValues = {
    craft_variant_id: detailCraft?.craft_variant_id ?? "",
    id_souvenir_place: detailCraft?.id_souvenir_place ?? "",
    name: `${detailCraft?.variant?.craft?.name ?? ""} ${
      detailCraft?.variant?.name ?? ""
    }`,
    price: detailCraft?.price ?? 0,
    weight: detailCraft?.weight ?? 0,
    modal: detailCraft?.modal ?? 0,
    stock: detailCraft?.stock ?? 0,
    description: detailCraft?.description ?? "",
    images: images ?? [],
    isNewImage: 0,
  };

  const handleUpdateDetailCraft = (
    values: DetailCraftSchema & { isNewImage: number }
  ) => {
    const { images: currentImages, ...restValues } = values;
    const { images: initialImages, ...restInitialValues } = initialValues;

    const isSameData = isEqual(restValues, restInitialValues);
    const isSameImageList = isSameImages(
      currentImages ?? [],
      initialImages ?? []
    );

    console.log(isSameImageList);
    if (!isSameData || !isSameImageList) {
      const formData = createFormData(values);
      console.log(values);
      if (!isSameImageList) {
        formData.set("isNewImage", "1");
      }
      updateDetailCraft(formData);
    } else {
      cornerAlert("Tidak ada perubahan yang dilakukan");
    }
  };

  return {
    isLoading: detailCraftLoading || craftLoading,
    crafts,
    initialValues,
    detailCraft,
    handleUpdateDetailCraft,
    isPending,
  };
};
