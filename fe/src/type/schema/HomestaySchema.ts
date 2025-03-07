import { UnitFacilityDetailSchema } from "./FacilitySchema";
import { Geometry } from "./GeometrySchema";

export type HomestaySchema = {
    id: string;
    name: string;
    address: string;
    contact_person?: string;
    description?: string;
    status?: number;
    geom?: Geometry;
    open?: string;
    close?: string;
    homestay_status?: number;
    video_url?: string | null;
  };

  export type HomestayDetails = {
    homestay_id: string;
    unit_type: string;
    unit_number: string;
    unit_name: string;
    description: string;
    price: number;
    capacity: number;
    homestay: HomestaySchema;
    unitType: HomestayUnitType;
    facilittyDetail: UnitFacilityDetailSchema[]
  };

  export type HomestayUnitType = {
    id: string;
    name_type: string;
  };
  