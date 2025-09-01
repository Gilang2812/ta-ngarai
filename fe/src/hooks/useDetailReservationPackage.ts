import { useFetchReservationByID } from "@/features/web/detailReservation/useFetchReservationById";
import usePackagePayment from "./usePackagePayment";
import { getReservationStatus } from "@/utils/common/getReservationStatus";

export const useDetailReservationPackage = (id: string) => {
  const { data, isLoading, refetch } = useFetchReservationByID(id);

  const { handlePayment, item_details, handleRecheck } = usePackagePayment({
    refetchReservation: refetch,
    data,
    status: getReservationStatus(data),
  });
  return {
    data,
    isLoading,
    handlePayment,
    item_details,
    refetch,
    handleRecheck,
  };
};
