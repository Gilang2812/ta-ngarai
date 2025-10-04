import { useDeleteCraftCart } from "@/features/web/craftCart/useDeleteCraftCart";
import { useFetchCraftCart } from "@/features/web/craftCart/useFetchCraftCart";
import { useUpdateCraftCart } from "@/features/web/craftCart/useUpdateCraftCart";
import { CraftCartSchema } from "@/type/schema/CraftCartSchema";
import {
  confirmDeleteAlert,
  cornerAlert,
  cornerError,
  showLoadingAlert,
} from "@/utils/AlertUtils";

import { useEffect, useState } from "react";
import useCheckoutCart from "./useCheckoutCart";
import { validateUser } from "@/utils/common/validateUser";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export const useUserCraftCart = () => {
  const pathname = usePathname();
  const { data: carts, isLoading, refetch } = useFetchCraftCart();
  const { data } = useSession();
  const [isDirty, setIsDirty] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState<CraftCartSchema[]>([]);
  const { createCheckout } = useCheckoutCart();

  const { mutate: updateCraftCart, isPending: isUpdating } = useUpdateCraftCart(
    {
      onSuccess: () => {
        cornerAlert("jumlah berhasil diupdate!");
        refetch();
      },
    }
  );

  const { mutateAsync: deleteCraftCart, isPending: isDeleting } =
    useDeleteCraftCart({
      onSuccess: () => {
        cornerAlert("Craft cart berhasil dihapus!");
        refetch();
      },
    });

  const handleDeleteCraftCart = async (
    {
      craft_variant_id,
      id_souvenir_place,
      checkout_id,
    }: {
      craft_variant_id: string;
      id_souvenir_place: string;
      checkout_id: string;
    },
    name: string
  ) => {
    confirmDeleteAlert("craft item", name, async () => {
      await deleteCraftCart({
        craft_variant_id,
        id_souvenir_place,
        checkout_id,
      });
    });
  };

  const handleCheckout = () => {
    validateUser(data?.user || null, pathname);
    if (selectedCraft.length === 0) {
      cornerError("Silakan pilih craft yang ingin dibeli!");
      return;
    }
    createCheckout({ items: selectedCraft });
  };

  useEffect(() => {
    if (carts) {
      setSelectedCraft((prev) => {
        const filteredCarts = carts.filter((item) =>
          prev.map((i) => i.craft_variant_id).includes(item.craft_variant_id)
        );
        return filteredCarts.map((item) => ({
          craft_variant_id: item.craft_variant_id,
          id_souvenir_place: item.id_souvenir_place,
          checkout_id: item.checkout_id,
          jumlah: item.jumlah,
          price: item.detailCraft.price,
        }));
      });
    }
  }, [carts]);
  useEffect(() => {
    if (isDeleting) {
      showLoadingAlert();
    }
  }, [isDeleting]);
  const handleCheckedCraft = (craft: CraftCartSchema) => {
    setSelectedCraft((prev) => {
      const index = prev.findIndex(
        (item) =>
          item.craft_variant_id === craft.craft_variant_id &&
          item.id_souvenir_place === craft.id_souvenir_place &&
          item.checkout_id === craft.checkout_id
      );
      if (index > -1) {
        return prev.filter(
          (item) =>
            !(
              item.craft_variant_id === craft.craft_variant_id &&
              item.id_souvenir_place === craft.id_souvenir_place &&
              item.checkout_id === craft.checkout_id
            )
        );
      } else {
        return [...prev, craft];
      }
    });
  };

  useEffect(() => {
    if (isUpdating) {
      showLoadingAlert();
    }
  }, [isUpdating]);

  return {
    carts,
    isLoading,
    updateCraftCart,
    isUpdating,
    isDirty,
    setIsDirty,
    handleDeleteCraftCart,
    selectedCraft,
    handleCheckedCraft,
    handleCheckout,
  };
};
