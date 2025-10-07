import { useGetHomestay } from "@/features/dashboard/homestay/useGetHomestay";
import { UnitHomestay } from "@/types/schema/HomestaySchema";

import { getCentroid } from "@/utils/common/getCentroid";
import { useModal } from "@/utils/ModalUtils";
import { useState } from "react";

const useManageDetailHomestay = (id: string) => {
  const { isOpen, toggleModal } = useModal();
  const [selectedUnit, setSelectedUnit] = useState<UnitHomestay | null>(null);
  const { data, isLoading } = useGetHomestay(id);
  const geom = data?.geom;
  const centroid = getCentroid(geom);
  const handleSelectedUnit = (unit: UnitHomestay) => {
    setSelectedUnit(unit);
    toggleModal();
  };
  return {
    data,
    isLoading,
    geom,
    centroid,
    selectedUnit,
    handleSelectedUnit,
    toggleModal,
    isOpen,
  };
};

export default useManageDetailHomestay;
