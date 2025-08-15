import { FilepondType } from "@/type/common/FilepondType";
import * as yup from "yup";

export const createHomestaySchema = yup.object({
  name: yup.string().min(2).max(100).required(),
  address: yup.string().min(5).max(200).required(),
  contact_person: yup.string().min(2).max(100).required(),
  description: yup.string().min(5).max(500).required(),
  geom: yup.string().required("draw your homestay on the map"),
  open: yup
    .string()
    .matches(/^\d{1,2}:\d{2}$/, "Invalid time format")
    .required(),
  close: yup
    .string()
    .matches(/^\d{1,2}:\d{2}$/, "Invalid time format")
    .required(),
  images: yup.array().of(yup.mixed()).required(),
});

export const createUnitSchema = yup.object({
  homestay_id: yup.string().required(),
  unit_type: yup.string().required("please select a unit type"),
  unit_name: yup.string().min(2).max(100).required(),
  capacity: yup.number().min(1).required(),
  price: yup.number().min(100,"input a valid price").required(),
  description: yup.string().min(5).max(500).required(),
});

export const createFacilityUnitSchema = yup.object({
  unitHomestay: yup
    .string()
    .required("Unit Homestay is required")
    .test("is-valid-json", "Invalid Unit Homestay data", (value) => {
      try {
        const parsed = JSON.parse(value || "{}");
        return (
          typeof parsed === "object" &&
          parsed.homestay_id?.trim() &&
          parsed.unit_type?.trim() &&
          parsed.unit_number?.trim()
        );
      } catch {
        return false;
      }
    }),
  facility_unit_id: yup.string().required("Facility Unit ID is required"),
  description: yup.string().min(5).max(500).required("Description is required"),
});

export const createFacilitySchema = yup.object({
  name: yup.string().min(2).max(100).required("Facility name is required"),
});

export type CreateUnitFormSchema = yup.InferType<typeof createUnitSchema> & {
  unit_number?: string;
  images: FilepondType;
};
export type CreateFacilityFormSchema = yup.InferType<
  typeof createFacilitySchema
>;
export type CreateFacilityUnitFormSchema = yup.InferType<
  typeof createFacilityUnitSchema
>;

export type CreateHomestaySchema = yup.InferType<
  typeof createHomestaySchema
> & {
  status?: number;
  video_url?: string;
  latitude?: string;
  longitude?: string;
};
