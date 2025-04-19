import { useToggleStore } from "@/stores/ToggleStore"; 

export const useTools = () => {
  return useToggleStore() 
};
