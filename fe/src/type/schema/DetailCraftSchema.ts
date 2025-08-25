import * as yup from "yup";
import { CraftVariantGallery, FetchCraftVariant } from "./CraftSchema";
import { CheckoutItem } from "./CheckoutSchema";
import { SouvenirPlace } from "./CraftTransactionSchema";
import { FilepondType } from "../common/FilepondType";
export type DetailCraftInclude = (
  | "craft"
  | "craftGalleries"
  | "checkout"
  | "reviewGalleries"
  | "souvenirPlace"
)[];

export const detailCraftSchema = yup.object({
  craft_variant_id: yup.string().required("Nama craft varian wajib diisi"),
  price: yup
    .number()
    .typeError("Harga harus berupa angka")
    .min(0, "Harga tidak boleh negatif")
    .required("Harga wajib diisi"),
  weight: yup
    .number()
    .typeError(
      "Berat harus berupa angka, ganti tanda koma (',') dengan titik ('.') jika ada"
    )
    .moreThan(0, "Berat harus lebih dari 0")
    .required("Berat wajib diisi"),
  stock: yup
    .number()
    .typeError("Stok harus berupa angka")
    .min(0, "Stok tidak boleh negatif")
    .required("Stok wajib diisi"),
  modal: yup
    .number()
    .typeError("Modal harus berupa angka")
    .min(0, "Modal tidak boleh negatif")
    .nullable()
    .optional(),
  description: yup.string().required("Deskripsi wajib diisi"),
  images: yup.array().max(5, "Maksimal 5 gambar").nullable(),
});

export type DetailCraftSchema = yup.InferType<typeof detailCraftSchema> & {
  id_souvenir_place: string;
  images: FilepondType;
};

export type DetailCraftManagementResponse = DetailCraftSchema & {
  id_souvenir_place: string;
  variant: FetchCraftVariant;
  craftGalleries: CraftVariantGallery[];
};

export type DetailCraftUserResponse = DetailCraftManagementResponse & {
  items: CheckoutItem[];
  
};

export type DetailCraftOrderResponse = DetailCraftUserResponse & {
  souvenirPlace: SouvenirPlace;
};

export type DetailCraftResponseSouvenirPlace = DetailCraftManagementResponse & {
  souvenirPlace: SouvenirPlace & { address: string; contact_person: string };
};
