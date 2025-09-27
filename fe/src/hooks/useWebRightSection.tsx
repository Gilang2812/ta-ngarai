import { useTools } from "./useTools";

export const useWebRightSection = () => {
  const { aroundOpen, packageOpen, toggleAround, togglePackage, setObjectId } =
    useTools();

  return {
    togglePackage,
    toggleAround,
    packageOpen,
    setObjectId,
    aroundOpen,
  };
};
