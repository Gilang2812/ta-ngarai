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

export type ItemRatesType = {
  name: string;
  value: number;
  weight: number;
  quantity: number;
};
export type CourierRatesRequestBody = {
  origin_area_id: string;
  destination_area_id: string;
  couriers: string;
  items: ItemRatesType[];
};

export type LocationInfo = {
  location_id: string | null;
  latitude: number | null;
  longitude: number | null;
  postal_code: number;
  country_name: string;
  country_code: string;
  administrative_division_level_1_name: string;
  administrative_division_level_1_type: string;
  administrative_division_level_2_name: string;
  administrative_division_level_2_type: string;
  administrative_division_level_3_name: string;
  administrative_division_level_3_type: string;
  administrative_division_level_4_name: string;
  administrative_division_level_4_type: string;
  address: string | null;
};

export type CourierPricing = {
  available_collection_method: string[];
  available_for_cash_on_delivery: boolean;
  available_for_proof_of_delivery: boolean;
  available_for_instant_waybill_id: boolean;
  available_for_insurance: boolean;
  company: string;
  courier_name: string;
  courier_code: string;
  courier_service_name: string;
  courier_service_code: string;
  currency: string;
  description: string;
  duration: string;
  shipment_duration_range: string;
  shipment_duration_unit: string;
  service_type: string;
  shipping_type: string;
  price: number;
  type: string;
};

export type CourierRatesResponse = {
  success: boolean;
  object: string;
  pricing: CourierPricing[];
};

export type DraftRequestForm = {
  origin_contact_name: string;
  origin_contact_phone: string;
  origin_address: string;
  origin_note: string;
  origin_area_id: string;
  destination_contact_name: string;
  destination_contact_phone: string;
  destination_contact_email: string;
  destination_address: string;
  destination_area_id: string;
  destination_note: string;
  courier_company: string;
  courier_type: string;
  delivery_type: string;
  order_note: string;
  items: ItemRatesType[];
};

export type AreaItem = {
  id: string;
  name: string;
  country_name: string;
  country_code: string;
  administrative_division_level_1_name: string;
  administrative_division_level_1_type: string;
  administrative_division_level_2_name: string;
  administrative_division_level_2_type: string;
  administrative_division_level_3_name: string;
  administrative_division_level_3_type: string;
  postal_code: number;
};

export type AreaResponse = {
  success: boolean;
  areas: AreaItem[];
};

export type TrackingCourier = {
  company: string;
  driver_name: string;
  driver_phone: string; 
};

export type TrackingContact = {
  contact_name: string;
  address: string;
};

export type TrackingHistoryItem = {
  note: string;
  service_type: string;
  updated_at: string;
  status: string;
};

export type TrackingResponse = {
  success: boolean;
  messsage: string;
  object: string;
  id: string;
  waybill_id: string;
  courier: TrackingCourier;
  origin: TrackingContact;
  destination: TrackingContact;
  history: TrackingHistoryItem[];
  link: string;
  order_id: string;
  status: string;
};
