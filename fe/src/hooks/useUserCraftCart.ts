import { useCreateCheckout } from "@/features/web/checkout/useCreateCheckout";
import { useDeleteCraftCart } from "@/features/web/craftCart/useDeleteCraftCart";
import { useFetchCraftCart } from "@/features/web/craftCart/useFetchCraftCart";
import { useUpdateCraftCart } from "@/features/web/craftCart/useUpdateCraftCart";
import { CraftCartSchema } from "@/type/schema/CraftCartSchema";
import {
  confirmDeleteAlert,
  cornerAlert,
  cornerError,
} from "@/utils/AlertUtils";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export const useUserCraftCart = () => {
  const router = useRouter();
  const { data: carts, isLoading, refetch } = useFetchCraftCart();
  const [isDirty, setIsDirty] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState<CraftCartSchema[]>([]);
  const { mutate: updateCraftCart, isPending: isUpdating } = useUpdateCraftCart(
    {
      onSuccess: () => {
        cornerAlert("jumlah berhasil diupdate!");
        refetch();
      },
    }
  );

  const { mutateAsync: deleteCraftCart } = useDeleteCraftCart({
    onSuccess: () => {
      cornerAlert("Craft cart berhasil dihapus!");
      refetch();
    },
  });

  const handleDeleteCraftCart = async (idVariant: string, name: string) => {
    confirmDeleteAlert("craft item", name, async () => {
      await deleteCraftCart(idVariant);
    });
  };
  const { mutateAsync: createCheckout } = useCreateCheckout({
    onSuccess: () => {
      cornerAlert("akan segera dialihkan ke halaman pembayaran!");
      router.push("./checkout");
    },
  });
  const handleCheckout = () => {
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
        return filteredCarts.map(item=>({
          craft_variant_id: item.craft_variant_id,
          jumlah: item.jumlah,
          price: item.cartCraft.price,
        }))
      });
    }
  }, [carts]);

  const handleCheckedCraft = (craft: CraftCartSchema) => {
    setSelectedCraft((prev) => {
      const index = prev.findIndex(
        (item) => item.craft_variant_id === craft.craft_variant_id
      );
      if (index > -1) {
        return prev.filter(
          (item) => item.craft_variant_id !== craft.craft_variant_id
        );
      } else {
        return [...prev, craft];
      }
    });
  };
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
