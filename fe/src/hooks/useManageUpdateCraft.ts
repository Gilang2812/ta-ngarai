import { useFetchCraft } from "@/features/dashboard/craft/useFetchCraft";
import { useGetVariant } from "@/features/dashboard/craft/useGetVariant";
import { useUpdateCraftVariant } from "@/features/dashboard/craftVariant/useUpdateCraftVariant";
import { baseUrl } from "@/lib/baseUrl";
import { CraftVariant } from "@/type/schema/CraftSchema";
import { cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useMemo } from "react";
import isEqual from "lodash/isEqual";
import { isSameImages } from "@/utils/common/isSamgeImages";

export const useManageUpdateCraft = (id: string) => {
  const {
    data: variant,
    isLoading: variantLoading,
    refetch: refetchVariant,
  } = useGetVariant(id);
  const { data: crafts, isLoading: craftLoading } = useFetchCraft();
  const { mutate: updateVariant, isPending } = useUpdateCraftVariant({
    onSuccess: () => {
      cornerAlert("variasi kerajinan berhasil diperbarui");
      refetchVariant();
    },
  });
  const images = useMemo(() => {
    if (!variant?.craftGalleries?.length) return [];

    return variant.craftGalleries.map((image) => ({
      source: `${baseUrl}/${image.url}?v=${new Date().getTime()}`,
      option: {
        type: "local",
      },
    }));
  }, [variant]);

  const initialValues = {
    id: variant?.id ?? "",
    name: variant?.name ?? "",
    id_craft: variant?.id_craft ?? "",
    price: variant?.price ?? 0,
    modal: variant?.modal ?? 0,
    stock: variant?.stock ?? 0,
    description: variant?.description ?? "",
    images: images ?? [],
  };

  const handleUpdateVariant = (values: CraftVariant) => {
    const { images: currentImages, ...restValues } = values;
    const { images: initialImages, ...restInitialValues } = initialValues;

    const isSameData = isEqual(restValues, restInitialValues);
    const isSameImageList = isSameImages(
      currentImages ?? [],
      initialImages ?? []
    );

    console.log(isSameImageList)
    if (!isSameData || !isSameImageList) {
    const formData = createFormData(values);
    console.log(values);
    updateVariant(formData);
    } else {
      cornerAlert("Tidak ada perubahan yang dilakukan");
    }
  };

  return {
    isLoading: variantLoading || craftLoading,
    crafts,
    initialValues,
    variant,
    handleUpdateVariant,
    isPending,
  };
};
