import * as yup from "yup";
import { Craft, CraftVariantGallery } from "./CraftSchema";

export const craftCart = yup.object({
  jumlah: yup
    .number()
    .typeError("Jumlah must be a number")
    .required("Jumlah is required")
    .min(1, "Jumlah must be at least 1"),
});
export type CraftCartForm = yup.InferType<typeof craftCart> & {
  craft_variant_id: string;
};
export type CraftCartSchema = CraftCartForm & { price: number };
type cartCraft = {
  id: string;
  id_craft: string;
  name: string;
  price: number;
};
export type CartItemProps = CraftCartForm & {
  cartCraft: cartCraft & {
    craft: Craft;
    craftGalleries: CraftVariantGallery[];
  };
};
