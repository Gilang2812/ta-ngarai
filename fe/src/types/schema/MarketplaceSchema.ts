import * as Yup from "yup";
import { FilepondType } from "../common/FilepondType";

export const marketplaceSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  contact_person: Yup.string().required("Contact person is required"),
  open: Yup.string().required("Opening time is required"),
  close: Yup.string().required("Closing time is required"),
  description: Yup.string().required("Description is required"),
  geom: Yup.string().required("Location on map is required"),
  destination_id: Yup.string().required("Please complete the data below"),
  negara: Yup.string().required("Please select a country"),
  provinsi: Yup.string().required("Please select a province"),
  kota: Yup.string().required("Please select a city"),
  kecamatan: Yup.string().required("Please select a district"),
});

export type FormMarketplace = Yup.InferType<typeof marketplaceSchema> & {
  id: string;
  images: FilepondType;
};
