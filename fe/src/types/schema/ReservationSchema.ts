import { homestayReservationFormSchema } from "../../validation/homestayReservationFormSchema";
import {
  DetailPackageSchema,
  PackageDay,
  PackageSchema,
  PackageService,
} from "./PackageSchema";
import {
  HomestayDetails,
  HomestaySchema,
  HomestayUnitType,
  UnitHomestaySchema,
} from "./HomestaySchema";
import { User } from "./UsersSchema";
import * as yup from "yup";
import { GalleryHomestaySchema } from "./GalleryHomestaySchema";
import { UserLogin } from "@/validation/authSchema";
import { confirmationSchema } from "@/validation/reservation";

export type ReservationDetails = {
  id: string;
  user_id: number;
  package_id: string;
  request_date: string;
  check_in: string;
  total_people: number;
  note: string;
  deposit: number;
  days_of_stay: number;
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
  refund_check: number | null;
  refund_date: string | null;
  admin_refund: string | null;
  type_of_payment: number;
};

export type DetailReservationResponse = {
  date: string;
  homestay_id: string;
  unit_type: string;
  unit_number: string;
  reservation_id: string;
  review: string | null;
  rating: number;
  unit_guest: string | null;
};

export type DetailReservationSchema = DetailReservationResponse & {
  homestay: HomestayDetails;
  reservation: ReservationDetails;
};

export type ReservationSchema = ReservationDetails & {
  package: PackageService;
  customer: User;
  detail: DetailReservation[];
};

export type DetailReservationSchemaWithPackageDay = ReservationDetails & {
  package: PackageSchema & {
    packageDays: PackageDay[];
  };
  customer: User;
  detail: DetailReservationSchema[];
};
export type HomestayReservationFormSchemaType = yup.InferType<
  typeof homestayReservationFormSchema
> & {
  unit_type: string;
  selected_capacity: number;
  payment: "full" | "partial" | "";
  total_deposit: number | "";
  total_price_reservation: number | "";
};

export type DetailReservation = DetailReservationResponse & {
  homestay: UnitHomestaySchema & {
    homestay: HomestaySchema & {
      galleries: GalleryHomestaySchema[];
    };
    unitType: HomestayUnitType;
  };
};

export type DetailHomestayReservation = ReservationDetails & {
  detail: DetailReservation[];
};

export type DetailReservationReviewSchema = DetailReservationResponse & {
  homestay: HomestayDetails;
};

export type DetailReservationReview = ReservationDetails & {
  package: PackageSchema & {
    packageDays: (PackageDay & {
      detailPackages: DetailPackageSchema[];
    })[];
  };
  customer: UserLogin;
  confirm: {
    fullname: string;
  };
  refund: {
    fullname: string;
  };
  detail: DetailReservationReviewSchema[];
};

export type DetailReservationPackage = ReservationDetails & {
  package: PackageService;
  customer: User;
  refund: {
    fullname: string;
  };
  confirm: {
    fullname: string;
  };
  detail: DetailReservation[];
};

export type HomestayReviewFormSchema = {
  date: string;
  unit_type: string;
  homestay_id: string;
  unit_number: string;
  reservation_id: string;
  review: string;
  review_rating: number;
};
export type PackageReviewFormSchema = {
  id: string;
  review: string;
  review_rating: number;
};

export type ConfirmationFormSchema = yup.InferType<typeof confirmationSchema>;
