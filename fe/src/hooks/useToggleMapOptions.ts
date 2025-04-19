import { useCallback, useState } from "react";

export const useToggleMapOptions = (initialState: Record<string, boolean>) => {
  const [state, setState] = useState(initialState);

  const toggleAllOptions = useCallback(() => {
    const allToggled = Object.fromEntries(
      Object.entries(state).map(([keyframes, value]) => [keyframes, !value])
    );

    setState(allToggled);
  }, [state]);

  const checkAllOptions = useCallback(() => {
    const allToggled = Object.fromEntries(
      Object.entries(state).map(([keyframes]) => [keyframes, true])
    );

    setState(allToggled);
  }, [state]);
  const unCheckAllOptions = useCallback(() => {
    const allToggled = Object.fromEntries(
      Object.entries(state).map(([keyframes]) => [keyframes, false])
    );

    setState(allToggled);
  }, [state]);

  return {
    state,
    setState,
    toggleAllOptions,
    checkAllOptions,
    unCheckAllOptions,
  };
};
