import { useCallback } from "react";

export const useCheckBox = () => {
  const toggleCheckBox = useCallback(
    (callback: (value: boolean) => void) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        callback(e.target.checked);
      },
    []
  );
  return {toggleCheckBox}
};
