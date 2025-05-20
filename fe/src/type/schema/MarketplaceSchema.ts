import * as Yup from "yup";

export const marketplaceSchema = Yup.object({
  name: Yup.string().required("Nama wajib diisi"),
  address: Yup.string().required("Alamat wajib diisi"),
  contact_person: Yup.string().required("Kontact  wajib diisi"),
  open: Yup.string().required("Jam buka wajib diisi"),
  close: Yup.string().required("Jam tutup wajib diisi"),
  description: Yup.string().required("description wajib diisi"), 
  geom: Yup.string().required("gamber alamat di peta"), 
  
});

export type FormMarketplace = Yup.InferType<typeof marketplaceSchema> & {
  id: string;
};
