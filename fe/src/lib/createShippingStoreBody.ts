import { Address, Checkout, CheckoutItem } from "@/type/schema/CheckoutSchema";
import { ShippingItem } from "@/type/schema/ShippingSchema";

export const createShippingStoreBody = (
  groupedItems: CheckoutItem[][],
  checkout: Checkout | undefined,
  itemShipping: ShippingItem[],
  selectedAddress: Address | undefined
) => {
  return groupedItems.map((items, index) => ({
    order_date: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    ).toISOString(),
    brand_name: "Craft",
    shipper_name: checkout?.items?.[0]?.detailCraft?.souvenirPlace.name,
    shipper_phone:
      checkout?.items?.[0]?.detailCraft?.souvenirPlace.contact_person,
    shipper_destination_id: 49279,
    shipper_address: checkout?.items?.[0]?.detailCraft?.souvenirPlace.address,
    shipper_email: "not registered",
    receiver_name: checkout?.shippingAddress.addressCustomer.fullname,
    receiver_phone: checkout?.shippingAddress.addressCustomer.phone,
    receiver_destination_id: parseInt(
      checkout?.shippingAddress.destination_id as string
    ),
    receiver_address: Object.values(selectedAddress || {}).join(", "),
    shipping: itemShipping[index]?.shipping_name,
    shipping_type: itemShipping[index]?.service_name,
    payment_method: "COD",
    shipping_cost: itemShipping[index]?.shipping_cost_net,
    shipping_cashback: itemShipping[index]?.shipping_cashback,
    service_fee: Math.ceil(0.028 * itemShipping[index]?.grandtotal),
    additional_cost: 0,
    grand_total: itemShipping[index]?.grandtotal,
    cod_value: itemShipping[index]?.grandtotal,
    insurance_value: 0,
    order_details: items.map((i) => ({
      product_id: `${i.detailCraft.id_souvenir_place}-${i.detailCraft.craft_variant_id}`,
      product_name: i.detailCraft?.variant.craft.name,
      product_variant_name: i.detailCraft?.variant.name,
      id_souvenir_place: i.detailCraft?.id_souvenir_place,
      note: i.note,
      shipping_id: i.shipping_id,
      product_price: i.detailCraft?.price,
      product_weight:
        i.detailCraft?.weight < 1
          ? Math.ceil(i.detailCraft?.weight)
          : Math.round(i.detailCraft?.weight),
      qty: i.jumlah,
      subtotal: i.detailCraft.price * i.jumlah,
    })),
  }));
};
