import { useFetchSouvenirPlace } from "@/features/dashboard/marketplace/useFetchSouvenirPlace"; 
import { hideLoadingAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { useEffect } from "react";
import { useOrderCraft } from "./useOrderCraft";
import { DetailCraftManagementResponse } from "@/type/schema/DetailCraftSchema";

export const useMapCraft = () => {
  const { data, isLoading } = useFetchSouvenirPlace<{
    crafts: DetailCraftManagementResponse[];
  }>(true);

  useEffect(() => {
    if (isLoading) {
      showLoadingAlert("fetching map");
    }
    return () => {
      hideLoadingAlert();
    };
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
    return () => {
      hideLoadingAlert();
    };
  }, [isChecking]);

  return {
    data,
    handleSubmit,
    actionRef,
    isCraftPending,
    isChecking,
    isLoading,
    handleBuy,
    handleCart,
  };
};
