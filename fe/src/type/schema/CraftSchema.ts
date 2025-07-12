import * as yup from "yup";
import { ItemCheckoutType } from "./CheckoutSchema";

export const craftSchema = yup.object({
  name: yup.string().required("Nama kerajinan wajib diisi"),
});

export const craftVariantSchema = yup.object({
  id_craft: yup.string().required("Please select a craft first"),
  name: yup.string().required("Variant name is required"),
});
export type Craft = yup.InferType<typeof craftSchema> & {
  id: string;
};

export type CraftResponse = Craft & {
  variants: CraftVariant[];
};
export type CraftVariant = {
  id: string;
  id_craft: string;
  name: string;
};
export type FetchCraftVariant = CraftVariant & {
  craft: Craft;
};
export type CraftVariantGallery = {
  id: string;
  id_craft_variant: string;
  id_souvenir_place: string;
  url: string;
};

export type CraftWithVariants = Craft & {
  souvenirPlace: {
    name: string;
    address: string;
  };
};

export type CraftVariantWithGalleriesSchema = CraftVariant & {
  craft: Craft;
  craftGalleries: CraftVariantGallery[];
};

export type CraftProduct = CraftVariantWithGalleriesSchema & {
  itemCheckouts: ItemCheckoutType[];
};

export type VariantBelongCraftSchema = CraftVariant & {
  craftGalleries: CraftVariantGallery[];
  itemCheckouts: ItemCheckoutType[];
};
export type CraftDetailSchema = CraftWithVariants & {
  variants: VariantBelongCraftSchema[];
};
export type CraftVariantInclude = (
  | "craft"
  | "craftGalleries"
  | "checkout"
  | "reviewGalleris"
)[];

export type CraftWithVariantsGalleries = (Craft & {
  variants: (CraftVariant & { craftGalleries: CraftVariantGallery[] })[];
})[];
