import { useCreateCheckout } from "@/features/web/checkout/useCreateCheckout";
import { useCreateCraftCart } from "@/features/web/craftCart/useCreateCraftCart";
import { CraftCartForm } from "@/type/schema/CraftCartSchema";
import { cornerAlert } from "@/utils/AlertUtils";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import Swal from "sweetalert2";

export const useOrderCraft = () => {
  const router = useRouter();
  const searchParms = useSearchParams();
  const actionRef = useRef<"cart" | "buy">("cart");

  const { mutateAsync: createCraftCart, isPending: isCraftPending } =
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
  const handleSubmit = async (values: CraftCartForm) => {
    console.log(values);
    const { id_souvenir_place, craft_variant_id, jumlah } = values;
    if (actionRef.current === "cart") {
      await createCraftCart({
        jumlah,
        id_souvenir_place,
        craft_variant_id: searchParms.get("idvr") || craft_variant_id,
      });
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
            jumlah,
            craft_variant_id: searchParms.get("idvr") || craft_variant_id,
            id_souvenir_place,
          },
        ],
      });
    }
  };

  const handleCart = () => {
    actionRef.current = "cart";
  };

  const handleBuy = () => {
    actionRef.current = "buy";
  };

  return {
    handleSubmit,
    actionRef,
    isCraftPending,
    isChecking,
    handleBuy,
    handleCart,
  };
};
