import * as yup from "yup";
import { DetailCraftManagementResponse } from "./DetailCraftSchema";
import { CraftCartCheckout } from "./CheckoutSchema";

export const craftCart = yup.object({
  jumlah: yup
    .number()
    .typeError("Jumlah must be a number")
    .required("Jumlah is required")
    .min(1, "Jumlah must be at least 1"),
});
export type CraftCartForm = yup.InferType<typeof craftCart> & {
  craft_variant_id: string;
  id_souvenir_place: string;
  checkout_id?: string;
};

export type UpdateCraftCartForm = CraftCartForm & {
  checkout_id: string;
};
export type CraftCartSchema = CraftCartForm & { price: number };

export type CartItemProps = CraftCartForm & {
  checkout_id: string;
  checkout: CraftCartCheckout;
  detailCraft: DetailCraftManagementResponse;
};
