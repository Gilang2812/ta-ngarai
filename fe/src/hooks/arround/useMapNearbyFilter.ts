// hooks/useAroundLogic.ts
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@/features/common/useDebounce"; 
import useObjectAroundStore from "@/stores/ObjectAroundStore";
import { useUserPositionStore } from "@/stores/UserPositionStore";
import Swal from "sweetalert2";
import { ObjectDataType } from "@/data/object";

export const useMpaNearbyFilter = (handleCloseAround: () => void) => {
  const { userPosition, radius, setRadius } = useUserPositionStore();
  const { checkObject, object } = useObjectAroundStore();

  const [inputValue, setInputValue] = useState(radius?.toString() ?? "0");
  const debouncedValue = useDebounce(inputValue, 500);

  const showLocationAlert = () => {
    Swal.fire(
      "Determine your position first!",
      "Click current location or set manual location",
      "info"
    );
  };

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!userPosition) {
      showLocationAlert();
      return setRadius(0);
    }

    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    setRadius(null);
    handleCloseAround();
  };

  const handleCheckboxChange = (
    key: keyof ObjectDataType,
    checked: boolean
  ) => {
    checkObject(key as keyof ObjectDataType, checked);
  };

  useEffect(() => {
    if (!userPosition) {
      setInputValue("0");
      setRadius(null);
    } else {
      const parsedValue = parseInt(debouncedValue as string);
      if (!isNaN(parsedValue)) {
        setRadius(parsedValue);
      }
    }
  }, [debouncedValue, userPosition, setRadius]);

  return {
    object,
    inputValue,
    radius,
    userPosition,
    handleRangeChange,
    handleSearchClick,
    handleCheckboxChange,
  };
};
