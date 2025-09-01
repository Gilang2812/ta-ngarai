import { Address, Checkout, CheckoutItem } from "@/type/schema/CheckoutSchema";
import { CourierPricing, DraftRequestForm } from "@/type/schema/ShippingSchema";

export const createShippingStoreBody = ({
  checkout,
  groupedItems,
  itemShipping,
  selectedAddress,
}: {
  groupedItems: CheckoutItem[][];
  checkout: Checkout | undefined;
  itemShipping: CourierPricing[];
  selectedAddress: Address | undefined;
}) => {
  const data: DraftRequestForm[] = groupedItems.map((items, index) => ({
    origin_contact_name:
      checkout?.items?.[0]?.detailCraft?.souvenirPlace?.name ?? "",
    origin_contact_phone:
      checkout?.items?.[0]?.detailCraft?.souvenirPlace?.contact_person ?? "",
    origin_address:
      checkout?.items?.[0]?.detailCraft?.souvenirPlace?.address ?? "",
    origin_note: items[0]?.note ?? "",
    origin_area_id: checkout?.shippingAddress?.destination_id ?? "",
    destination_contact_name:
      checkout?.shippingAddress?.addressCustomer?.fullname ?? "",
    destination_contact_phone:
      checkout?.shippingAddress?.addressCustomer?.phone ?? "085274953252",
    destination_contact_email:
      checkout?.shippingAddress?.addressCustomer?.email ?? "",
    destination_address: Object.values(selectedAddress || {}).join(", "),
    destination_area_id: checkout?.shippingAddress.destination_id as string,
    destination_note: "",
    courier_company: itemShipping[index]?.company,
    courier_type: itemShipping[index]?.courier_service_code,
    delivery_type: "now",
    order_note: "",
    shipping_cost: itemShipping[index]?.price,
    insurance_value: 0,
    items: items.map((i) => ({
      craft_variant_id: i.detailCraft.craft_variant_id,
      name: `${i.detailCraft?.variant.craft.name} ${i.detailCraft?.variant.name}`,
      id_souvenir_place: i.detailCraft?.id_souvenir_place,
      note: i.note,
      value: i.detailCraft?.price,
      weight:
        i.detailCraft?.weight < 1
          ? Math.ceil(i.detailCraft?.weight)
          : Math.round(i.detailCraft?.weight),
      quantity: i.jumlah,
    })),
  }));
  return data;
};
