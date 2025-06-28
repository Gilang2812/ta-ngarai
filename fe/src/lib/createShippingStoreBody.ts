import { Address, Checkout, CheckoutItem } from "@/type/schema/CheckoutSchema";
import { ShippingItem } from "@/type/schema/ShippingSchema";

export const createShippingStoreBody = (
  groupedItems: CheckoutItem[][],
  checkout: Checkout | undefined,
  itemShipping: ShippingItem[],
  selectedAddress: Address | undefined
) => {
  return groupedItems.map((items, index) => ({
    order_date: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString(),
    brand_name: "Craft",
    shipper_name: checkout?.items?.[0]?.craftVariant?.craft?.souvenirPlace.name,
    shipper_phone:
      checkout?.items?.[0]?.craftVariant?.craft?.souvenirPlace.contact_person,
    shipper_destination_id: 49279,
    shipper_address:
      checkout?.items?.[0]?.craftVariant?.craft?.souvenirPlace.address,
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
      product_id: i.craftVariant.id,
      product_name: i.craftVariant.craft.name,
      product_variant_name: i.craftVariant.name,
      note: i.note,
      shipping_id: i.shipping_id,
      product_price: i.craftVariant.price,
      product_weight:
        i.craftVariant.weight < 1
          ? Math.ceil(i.craftVariant.weight)
          : Math.round(i.craftVariant.weight),
      qty: i.jumlah,
      subtotal: i.craftVariant.price * i.jumlah,
    })),  
  }));
};
