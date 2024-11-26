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
