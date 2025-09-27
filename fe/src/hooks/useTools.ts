import { useToggleStore } from "@/stores/ToggleStore";
import { useCallback } from "react";

export const useTools = () => {
  const { open, toggleOpen, object_id, setObjectId } = useToggleStore();
  const packageOpen = open === "package";
  const aroundOpen = open === "around";
  const marketplaceOpen = open === "marketplace";

  const togglePackage = useCallback(() => {
    toggleOpen(packageOpen ? "default" : "package"); 
  }, [packageOpen, toggleOpen]);

  const toggleAround = useCallback(() => {
    toggleOpen(aroundOpen ? "default" : "around");
  }, [aroundOpen, toggleOpen]);

  const toggleMarketplace = useCallback(() => {
    toggleOpen(marketplaceOpen ? "default" : "marketplace");
  }, [marketplaceOpen, toggleOpen]);

  const toggleClose = useCallback(() => {
    toggleOpen("default");
  }, [toggleOpen]);

  return {
    open,
    aroundOpen,
    marketplaceOpen,
    packageOpen,
    toggleAround,
    toggleMarketplace,
    toggleOpen,
    togglePackage,
    toggleClose,
    object_id,
    setObjectId,
  };
};
