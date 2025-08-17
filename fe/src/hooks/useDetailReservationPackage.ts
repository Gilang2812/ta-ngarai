import { useFetchReservationByID } from "@/features/web/detailReservation/useFetchReservationById";
import usePackagePayment from "./usePackagePayment";
import { getReservationStatus } from "@/utils/common/getReservationStatus";

export const useDetailReservationPackage = (id: string) => {
  const { data, isLoading, refetch } = useFetchReservationByID(id);

  const { handlePayment, isPending, item_details } = usePackagePayment({
    refetchReservation: refetch,
    data,
    status:getReservationStatus(data)
  });
  return {
    data,
    isLoading,
    handlePayment,
    isPending,
    item_details,
    refetch,
  };
};
