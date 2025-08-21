import { useFetchUserDetailCrafts } from "@/features/detailCraft/useFetchUserDetailCraft";
import { DetailCraftOrderResponse, } from "@/type/schema/DetailCraftSchema";

export const useProductCraft = () => {
  const { data: crafts, isLoading } =
    useFetchUserDetailCrafts<DetailCraftOrderResponse>([
      "checkout",
      "craft",
      "craftGalleries",
      "souvenirPlace",
    ]);
  return {
    crafts,
    isLoading,
  };
};
