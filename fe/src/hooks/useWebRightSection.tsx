import { useCallback } from "react";
import { useTools } from "./useTools";

export const useWebRightSection = () => {
  const { toggleOpen, open } = useTools();
  
  const packageOpen = open==='package'
  const aroundOpen = open==='around'
  const togglePackage = useCallback(() => {
    toggleOpen(packageOpen ? "default" : "package");
  }, [packageOpen,toggleOpen]);
  const toggleAround = useCallback(() => {
    toggleOpen(aroundOpen? "default" : "around");
  }, [aroundOpen,toggleOpen]);

  return { togglePackage ,toggleAround,packageOpen,aroundOpen};
};
