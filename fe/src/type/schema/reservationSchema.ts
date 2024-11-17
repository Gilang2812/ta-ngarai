import { PackageSchema } from "./detailPackage";
import { DetailReservation } from "./detailReservationSchema";
import { User } from "./usersSchema";

export type ReservationSchema = {
    id: string;
    user_id: number;
    package_id: string;
    request_date: string;
    check_in: string;
    total_people: number;
    note: string;
    deposit: number;
    total_price: number;
    proof_of_deposit: string;
    admin_deposit_check: string | null;
    token_of_deposit: string;
    deposit_check: string;
    deposit_channel: string;
    deposit_date: string;
    proof_of_payment: string;
    admin_payment_check: string | null;
    token_of_payment: string;
    payment_check: string;
    payment_channel: string;
    payment_date: string;
    rating: number;
    review: string;
    status: number;
    confirmation_date: string;
    admin_confirm: number;
    feedback: string;
    response: string;
    cancel: number;
    cancel_date: string | null;
    account_refund: string | null;
    proof_refund: string | null;
    refund_amount: number | null;
    refund_check?: number | null |number;
    refund_date: string | null;
    admin_refund: string | null;
    type_of_payment: number;
    package: PackageSchema
    customer:  User
    detail: DetailReservation[]
  };

