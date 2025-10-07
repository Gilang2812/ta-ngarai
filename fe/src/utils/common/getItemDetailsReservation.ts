import { ItemDetails } from "@/types/common/paymentItemDetails";
import { PackageSchema } from "@/types/schema/PackageSchema";
import { DetailReservation } from "@/types/schema/ReservationSchema";

export const getItemDetailsReservation = (
  item_details: DetailReservation[],
  dataPackage?: PackageSchema
): ItemDetails[] => {
  return [
    ...(item_details?.map((item) => ({
      id: `${item.date}-${item?.reservation_id}-${item?.homestay_id}-${item?.unit_type}-${item?.unit_number}`,
      name: item.homestay?.unit_name,
      price: item.homestay?.price,
      quantity: 1,
    })) ?? []),
    ...(dataPackage ? [{
      id: dataPackage?.id,
      name: dataPackage?.name,
      price: dataPackage?.price,
      quantity: 1,
    }] : []),
  ];
};
