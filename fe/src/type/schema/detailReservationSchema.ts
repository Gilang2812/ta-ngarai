export type Geometry = {
  type: "MultiPolygon";
  coordinates: number[][][][];
};

export type HomestaySchema = {
  id: string;
  name: string;
  address: string;
  contact_person?: string;
  description?: string;
  status?: number;
  geom?: Geometry;
  open?: string;
  close?: string;
  homestay_status?: number;
  video_url?: string | null;
};

export type HomestayUnitType = {
  id: string;
  name_type: string;
};

export type HomestayDetails = {
  homestay_id: string;
  unit_type: string;
  unit_number: string;
  unit_name: string;
  description: string;
  price: number;
  capacity: number;
  Homestay: HomestaySchema;
  HomestayUnitType: HomestayUnitType;
};

export type ReservationDetails = {
  id: string;
  user_id: number;
  package_id: string;
  request_date: string;
  check_in: string;
  total_people: number;
  note: string;
  deposit: number;
  total_price: number;
  proof_of_deposit: string | null;
  admin_deposit_check: number | null;
  token_of_deposit: string | null;
  deposit_check: string;
  deposit_channel: string;
  deposit_date: string | null;
  proof_of_payment: string | null;
  admin_payment_check: number | null;
  token_of_payment: string | null;
  payment_check: string;
  payment_channel: string;
  payment_date: string | null;
  rating: number;
  review: string;
  status: number;
  confirmation_date: string | null;
  admin_confirm: number;
  feedback: string | null;
  response: string | null;
  cancel: number;
  cancel_date: string | null;
  account_refund: string | null;
  proof_refund: string | null;
  refund_amount: number | null;
  refund_check: string | null;
  refund_date: string | null;
  admin_refund: string | null;
  type_of_payment: number;
};

export type DetailReservation = {
  date: string;
  homestay_id: string;
  unit_type: string;
  unit_number: string;
  reservation_id: string;
  review: string | null;
  rating: number;
  unit_guest: string | null;
  homestay: HomestayDetails;
  reservation: ReservationDetails;
};
