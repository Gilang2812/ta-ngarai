import { useCallback, useState } from "react";  

// Generic hook yang menerima tipe state boolean object (layerType atau ObjectDataType)
export const useToggleMapOptions = <T extends Record<string, boolean>>(initialState: T) => {
  const [state, setState] = useState<T>(initialState); 
  const toggleAllOptions = useCallback(() => {
    
    const toggledState = Object.fromEntries(
      Object.entries(state).map(([key, value]) => [key, !value])
    ) as T;

    setState(toggledState);
  }, [state]);

  const checkAllOptions = useCallback(() => {
    const checkedState = Object.fromEntries(
      Object.keys(state).map((key) => [key, true])
    ) as T;

    setState(checkedState);
  }, [state]);

  const unCheckAllOptions = useCallback(() => {
    const uncheckedState = Object.fromEntries(
      Object.keys(state).map((key) => [key, false])
    ) as T;

    setState(uncheckedState);
  }, [state]);

  return {
    state,
    setState,
    toggleAllOptions,
    checkAllOptions,
    unCheckAllOptions,
  };
};
