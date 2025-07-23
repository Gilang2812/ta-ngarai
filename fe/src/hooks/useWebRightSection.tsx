
import { useTools } from "./useTools"; 

export const useWebRightSection = () => {
  const { aroundOpen, packageOpen, toggleAround, togglePackage, } = useTools(); 

  return {
    togglePackage,
    toggleAround,
    packageOpen,
    aroundOpen, 
  };
};
