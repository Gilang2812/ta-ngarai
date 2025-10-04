import { DetailCraftResponseSouvenirPlace } from "./DetailCraftSchema";
import { ReviewGallerySchema } from "./ReviewSchema";

export type ShippingData = { 
  shipping_id: string;
  shipping_no: string;
  draft_id: string;
  order_id: string;
  tracking_id: string;
  awb: string;
  grand_total: number;
  total_shipping_cost: number;
  shipping_type: string;
  shipping_name: string;
  status: number;
  shippingItems: ShippingItem[];
};

export type ShippingDataWithReviewGallery = { 
  shipping_id: string;
  shipping_no: string;
  draft_id: string;
  order_id: string;
  tracking_id: string;
  awb: string;
  grand_total: number;
  total_shipping_cost: number;
  shipping_type: string;
  owner_responder_id: number;
  shipping_name: string;
  status: number;
  shippingItems: (ShippingItem & {
    reviewGalleries: ReviewGallerySchema[];
  })[];
};

export type ShippingItem = {
  checkout_id: string;
  craft_variant_id: string;
  id_souvenir_place: string;
  shipping_id: string;
  jumlah: number;
  review_text: string;
  review_rating: number;
  review_date: string;
  seller_response: string;
  response_date: string;
  checkout: Checkout;
  detailCraft: DetailCraftResponseSouvenirPlace;
};

export type CraftVariant = {
  id: string;
  id_craft: string;
  name: string;
  price: number;
  craft: Craft;
  craftGalleries: CraftGallery[];
};

export type Craft = {
  id: string;
  name: string;
};

export type SouvenirPlace = {
  id: string;
  name: string;
};

export type CraftGallery = {
  id: string;
  craft_variant_id: string;
  id_souvenir_place: string;
  url: string;
};

export type Checkout = {
  id: string;
  customer_id: number;
  address_id: string;
  total_price: number | null;
  payment: string;
  shippingAddress: ShippingAddress;
  checkout_date: string;
  transaction_token: string;
};

export type ShippingAddress = {
  id: string;
  customer_id: number;
  label: string;
  recipient_name: string;
  recipient_phone: string;
  street: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  negara: string;
  kode_pos: string;
  addressCustomer: AddressCustomer;
};

export type AddressCustomer = {
  id: number;
  fullname: string;
};
