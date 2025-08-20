import { useFetchUserDetailCrafts } from "@/features/detailCraft/useFetchUserDetailCraft";
import { DetailCraftUserResponse } from "@/type/schema/DetailCraftSchema";

export const useProductCraft = () => {
  const { data: crafts, isLoading } =
    useFetchUserDetailCrafts<DetailCraftUserResponse>([
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
