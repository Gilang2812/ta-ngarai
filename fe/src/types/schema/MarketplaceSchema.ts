import * as Yup from "yup";
import { FilepondType } from "../common/FilepondType";

export const marketplaceSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  village: Yup.string().required("village is required"),
  contact_person: Yup.string().required("Contact person is required"),
  open: Yup.string().required("Opening time is required"),
  close: Yup.string().required("Closing time is required"),
  description: Yup.string().required("Description is required"),
  geom: Yup.string().required("Location on map is required"),
  destination_id: Yup.string().required("Please complete the data below"),
  country: Yup.string().required("Please select a country"),
  province: Yup.string().required("Please select a province"),
  regency: Yup.string().required("Please select a city"),
  district: Yup.string().required("Please select a district"),
  street: Yup.string().required("Street is required"),
  postal_code: Yup.string().required("Postal code is required").length(5, "Postal code must be exactly 5 characters"),
});

export type FormMarketplace = Yup.InferType<typeof marketplaceSchema> & {
  id: string;
  images: FilepondType;
};
