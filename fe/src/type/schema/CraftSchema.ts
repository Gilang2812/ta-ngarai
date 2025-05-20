import * as yup from "yup";

 
export const craftSchema = yup.object({ 
  name: yup.string().required("Nama kerajinan wajib diisi"),
});

 
export const craftVariantSchema = yup.object({
  id_craft: yup.string().required("ID kerajinan wajib dipilih"),
  name: yup.string().required("Nama varian wajib diisi"),
  price: yup
    .number()
    .typeError("Harga harus berupa angka")
    .min(0, "Harga tidak boleh negatif")
    .required("Harga wajib diisi"),
  stock: yup
    .number()
    .typeError("Stok harus berupa angka")
    .min(0, "Stok tidak boleh negatif")
    .required("Stok wajib diisi"),
  modal: yup
    .number()
    .typeError("Modal harus berupa angka")
    .min(0, "Modal tidak boleh negatif")
    .required("Modal wajib diisi"),
  description: yup.string().required("Deskripsi wajib diisi"),
});

export interface Products {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Products {
  quantity: number;
}

export type Craft = yup.InferType<typeof craftSchema> & { id: string };
export type CraftVariant = yup.InferType<typeof craftVariantSchema> & {
  id: string;
};

export interface CraftVariantGallery {
  id: string;
  checout_id: string;
  url: string;
}

export interface CraftWithVariants extends Craft {
  variants: CraftVariant[];
  galleries: CraftVariantGallery[];
}
