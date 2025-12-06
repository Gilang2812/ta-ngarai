import { MultiPolygon } from "geojson";
import {
  HomestayFacilityDetailSchema,
  HomestayFacilitySchema,
  UnitFacilityDetailSchema,
} from "./FacilitySchema";
import {
  GalleryHomestaySchema,
  UnitGallerySchema,
} from "./GalleryHomestaySchema";
import { DetailReservationResponse } from "./ReservationSchema";
import { LocationSchema } from "./LocationSchema";

export type HomestaySchema = {
  id: string;
  name: string;
  location: LocationSchema;
  street: string;
  contact_person?: string;
  description?: string;
  status?: number;
  geom?: MultiPolygon;
  open?: string;
  close?: string;
  homestay_status: number;
  video_url?: string | null;
};

export type UnitHomestaySchema = {
  homestay_id: string;
  unit_type: string;
  unit_number: string;
  unit_name: string;
  description: string;
  price: number;
  capacity: number;
};

export type HomestayDetails = UnitHomestaySchema & {
  homestay: HomestaySchema;
  unitType: HomestayUnitType;
  facilityDetails: UnitFacilityDetailSchema[];
};

export type HomestayUnitType = {
  id: string;
  name_type: string;
};

export type AllUnitHomestayResponseSchema = HomestayDetails & {
  unitGalleries: UnitGallerySchema[];
  detailReservations: (DetailReservationResponse & {
    reservation: {
      id: string;
      package_id: string;
      check_in: string;
      package: {
        id: string;
        packageDays: {
          day: string;
          package_id: string;
        }[];
      };
    };
  })[];
};

export type FacilityUnit = {
  homestay_id: string;
  unit_type: string;
  unit_number: string;
  facility_unit_id: string;
  description: string;
  unitFacility: HomestayFacilitySchema;
};

export type UnitHomestay = UnitHomestaySchema & {
  detailReservations: (DetailReservationResponse & {
    reservation: {
      id: string;
      user_id: string;
      customer: {
        fullname: string;
        username: string;
      };
    };
  })[];
  unitType: HomestayUnitType;
  unitGalleries: UnitGallerySchema[];
  facilityDetails: FacilityUnit[];
};
export type FetchHomestayProps = HomestaySchema & {
  details: HomestayFacilityDetailSchema[];
  galleries: GalleryHomestaySchema[];
  units: UnitHomestay[];
};

export type DataEditHomestay = HomestaySchema & {
  details: HomestayFacilityDetailSchema[];
  galleries: GalleryHomestaySchema[];
};
