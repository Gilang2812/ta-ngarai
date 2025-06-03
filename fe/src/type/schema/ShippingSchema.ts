export type ShippingItem = {
  shipping_name: string;
  service_name: string;
  weight: number;
  is_cod: boolean;
  shipping_cost: number;
  shipping_cashback: number;
  shipping_cost_net: number;
  grandtotal: number;
  service_fee: number;
  net_income: number;
  etd: string;
};

export type Meta = {
  message: string;
  code: number;
  status: string;
};
export type ShippingData = {
  calculate_regular: ShippingItem[];
  calculate_cargo: ShippingItem[];
  calculate_instant: ShippingItem[];
};

export type ShippingResponse = {
  meta: Meta;
  data: ShippingData;
};

export type ShippingProducts = {
  craft_variant_id: string;
  jumlah: number;
  note?: string | null;
  review_rating?: number | null;
  review_text?: string | null;
  seller_response?: string | null;
};

export type DestinationResponse = {
  meta: Meta;
  data: DestinationItem[];
};

export type DestinationItem = {
  id: number;
  label: string;
  subdistrict_name: string;
  district_name: string;
  city_name: string;
  province_name: string;
  zip_code: string;
};
