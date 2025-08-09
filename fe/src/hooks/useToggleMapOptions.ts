import { useCallback,   useState } from "react";

export const useToggleMapOptions = <T extends Record<string, boolean>>(
  initialState: T
) => {
  const [state, setState] = useState<T>(initialState);

  const allChecked = (objects: T): boolean => {
    return Object.values(objects).every((value) => value === true);
  };

  const checkAll = (objects: T) => {
    const checkedState = Object.fromEntries(
      Object.keys(objects).map((key) => [key, true])
    ) as T;
    return checkedState;
  };

  const unCheckAll = (objects: T) => {
    const uncheckedState = Object.fromEntries(
      Object.keys(objects).map((key) => [key, false])
    ) as T;
    return uncheckedState;
  };

  const toggleAllOptions = useCallback(() => {
    setState((prev) => (allChecked(prev) ? unCheckAll(prev) : checkAll(prev)));
  }, []);

  const checkAllOptions = useCallback(() => {
    const checkedState = Object.fromEntries(
      Object.keys(state).map((key) => [key, true])
    ) as T;

    setState(checkedState);
  }, []);

  const unCheckAllOptions = useCallback(() => {
    const uncheckedState = Object.fromEntries(
      Object.keys(state).map((key) => [key, false])
    ) as T;

    setState(uncheckedState);
  }, []);

 

  return {
    state,
    setState,
    toggleAllOptions,
    checkAllOptions,
    unCheckAllOptions,
    allChecked : allChecked(state),
  };
};
