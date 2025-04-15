import { useCallback, useState } from "react";

export const useToggleMapOptions = (initialState: Record<string, boolean>) => {
  const [state, setState] = useState(initialState);

  const toggleAllOptions = useCallback(() => {
    setState((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[key] = !newState[key];
      });
      return newState;
    });
  }, []);

  return { state, setState, toggleAllOptions };
};
