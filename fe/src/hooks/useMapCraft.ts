import { useFetchSouvenirPlace } from "@/features/dashboard/marketplace/useFetchSouvenirPlace";
import {    showLoadingAlert } from "@/utils/AlertUtils";
import { useCallback, useEffect, useState } from "react";
import { useOrderCraft } from "./useOrderCraft";
import { DetailCraftManagementResponse } from "@/type/schema/DetailCraftSchema";
import { useTools } from "./useTools";
import { SouvenirPlaceSchema } from "@/type/schema/PackageSchema";

export const useMapCraft = () => {
  const { toggleMarketplace, marketplaceOpen } = useTools();
  const [selectedStore, setSelectedStore] = useState<
    (SouvenirPlaceSchema & { crafts: DetailCraftManagementResponse[] }) | null
  >(null);

  const { data, isLoading } = useFetchSouvenirPlace<{
    crafts: DetailCraftManagementResponse[];
  }>(true);

  useEffect(() => {
    if (isLoading) {
      showLoadingAlert("fetching map");
    }
   
  }, [isLoading]);

  const {
    actionRef,
    handleSubmit,
    isCraftPending,
    isChecking,
    handleBuy,
    handleCart,
  } = useOrderCraft();

  useEffect(() => {
    if (isChecking) {
      showLoadingAlert("Checking out...");
    }
   
  }, [isChecking]);

  const handleSelectStore = useCallback(
    (
      store: SouvenirPlaceSchema & { crafts: DetailCraftManagementResponse[] }
    ) => {
      setSelectedStore(store);
      if (!marketplaceOpen) toggleMarketplace();
    },
    [marketplaceOpen, toggleMarketplace]
  );

  return {
    data,
    handleSubmit,
    actionRef,
    isCraftPending,
    isChecking,
    isLoading,
    handleBuy,
    handleCart,
    handleSelectStore,
    selectedStore,
  };
};
