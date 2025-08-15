import * as yup from "yup";

export const createFacilitySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

export const createDetailFacilitySchema = yup.object().shape({
  homestay_id: yup.string().required("Homestay Selection is required"),
  facility_homestay_id: yup.string().required("Select a Facility"),
  description: yup.string().required("Description is required"),
});

export type CreateFacilityHomestaySchema = {
  name: string;
};

export type CreateDetailFacilityHomestaySchema = DeleteDetailFacilitySchema & {
  description: string;
};

export type DeleteDetailFacilitySchema = {
  homestay_id: string;
  facility_homestay_id: string;
};
