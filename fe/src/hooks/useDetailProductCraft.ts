import { useGetCraft } from "@/features/dashboard/craft/useGetCraft";
import { useCreateCheckout } from "@/features/web/checkout/useCreateCheckout";
import { useCreateCraftCart } from "@/features/web/craftCart/useCreateCraftCart";
import { CraftCartForm, CraftCartSchema } from "@/type/schema/CraftCartSchema";
import { VariantBelongCraftSchema } from "@/type/schema/CraftSchema";
import { cornerAlert } from "@/utils/AlertUtils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export const useDetailProductCraft = (id: string, idVariant: string) => {
  const actionRef = useRef("");
  const searchParms = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParms.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParms]
  );

  const initialValues: CraftCartSchema = {
    craft_variant_id: idVariant,
    jumlah: 1,
  };

  const { data: craft, isLoading } = useGetCraft(id);
  const { mutate: createCraftCart, isPending: isCraftPending } =
    useCreateCraftCart({
      onSuccess: () => {
        cornerAlert("Cart updated!");
      },
    });

  const { mutateAsync: checkout, isPending: isChecking } = useCreateCheckout({
    onSuccess: () => {
      cornerAlert("Checkout created successfully!");
      router.push("/web/checkout");
    },
  });
  const initalVariant =
    craft?.variants.find(
      (vr) => vr.id.toLowerCase() === idVariant.toLowerCase()
    ) || craft?.variants?.[0];

  const [selectedVariant, setSelectedVariant] = useState<
    VariantBelongCraftSchema | undefined
  >(initalVariant);

  const mainImage = selectedVariant?.craftGalleries?.[0].url || "";
  const [selectedImage, setSelectedImage] = useState<string>(mainImage);

  useEffect(() => {
    if (initalVariant && !selectedVariant) setSelectedVariant(initalVariant);
    if (mainImage) setSelectedImage(mainImage);
  }, [initalVariant, mainImage, selectedVariant]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (image: string, index: number) => {
    setSelectedImage(image);
    setActiveIndex(index);
  };

  const handlePrevImageButton = () => {
    const maxLength = (selectedVariant?.craftGalleries?.length ?? 1) - 1;
    const imageIndex = activeIndex === 0 ? maxLength : activeIndex - 1;
    setActiveIndex((prev) => {
      if (prev === 0) {
        return (selectedVariant?.craftGalleries?.length ?? 1) - 1;
      }
      return Math.max(0, prev - 1);
    });

    setSelectedImage(selectedVariant?.craftGalleries?.[imageIndex]?.url || "");
  };

  const handleNextImageButton = () => {
    const maxLength = (selectedVariant?.craftGalleries?.length ?? 1) - 1;
    const imageIndex = activeIndex === maxLength ? 0 : activeIndex + 1;

    setActiveIndex((prev) => {
      if (prev === maxLength) {
        return 0;
      }
      return Math.min(maxLength, prev + 1);
    });

    setSelectedImage(selectedVariant?.craftGalleries?.[imageIndex]?.url || "");
  };

  const handleSubmit = async (values: CraftCartForm) => {
    if (actionRef.current === "cart") {
      await createCraftCart({
        jumlah: values.jumlah,
        craft_variant_id: searchParms.get("idvr") || values.craft_variant_id,
      });
      console.log("Craft cart submitted:", values);
    } else if (actionRef.current === "buy") {
      Swal.fire({
        title: "checking out",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await checkout({
        items: [
          {
            jumlah: values.jumlah,
            craft_variant_id:
              searchParms.get("idvr") || values.craft_variant_id,
          },
        ],
      });
    }
  };

  const handleSelectedVariant = (variant: VariantBelongCraftSchema) => {
    setSelectedVariant(variant);
    router.push(`${pathName}?${createQueryString("idvr", variant.id)}`);
  };
  return {
    craft,
    isLoading,
    selectedVariant,
    selectedImage,
    setSelectedVariant: handleSelectedVariant,
    activeIndex,
    handleThumbnailClick,
    handleNextImageButton,
    initialValues,
    handlePrevImageButton,
    actionRef,
    isCraftPending,
    isChecking,
    handleSubmit,
  };
};
