import { UnitFacilityDetailSchema } from "./FacilitySchema";
import { UnitGallerySchema } from "./GalleryHomestaySchema";
import { Geometry } from "./GeometrySchema";
import { DetailReservationResponse } from "./ReservationSchema";

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
