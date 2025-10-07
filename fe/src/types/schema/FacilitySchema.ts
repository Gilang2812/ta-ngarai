export type HomestayFacilitySchema = {
  id: string;
  name: string;
};

export type HomestayFacilityDetailSchema = {
  homestay_id: string;
  facility_homestay_id: string;
  description: string;
  facility: HomestayFacilitySchema;
};

export type UnitFacilityDetailSchema = {
  description: string;
  unitFacility: HomestayFacilitySchema;
}
