import { MultiPolygon } from "geojson";
import { Time } from "../common/TimeType";
import { GalleryPackageSchema } from "./GallerySchema";
import { DetailServiceSchema } from "./ServiceSchema";
import {
  detailPackageFormSchema,
  editPackageFormSchema,
  packageDayFormSchema,
  packageTypeFormSchema,
} from "@/validation/package.validation";
import * as yup from "yup";
import { FilepondType } from "../common/FilepondType";
import { LocationSchema } from "./LocationSchema";

export type PackageTypeSchema = {
  id: string;
  type_name: string;
};
export type PackageSchema = {
  id: string;
  name: string;
  type_id: string;
  price: number;
  contact_person: string;
  description: string;
  video_url: string;
  geom: unknown | null;
  min_capacity: number;
  custom: number;
  status: number;
  type: PackageTypeSchema;
};

export type PackageDay = {
  package_id: string;
  day: number;
  description: string;
  status: number;
  created_at: string;
  updated_at: string;
};

export type DetailPackageSchema = {
  package_id: string;
  day: string;
  activity: string;
  activity_type: "A" | "CP" | "FC" | "SP" | "TH" | "WO";
  object_id: string;
  description: string;
  status: number;
  object: SimplifiedObject;
};

export type ObjectBase = {
  id: string;
  name: string;
  geom: MultiPolygon;
  geom_area: MultiPolygon;
};
export type ObjectSchema =
  | AttractionSchema
  | CulinaryPlace
  | Facility
  | SouvenirPlaceSchema
  | TraditionalHouse
  | WorshipPlaceSchema;

export type AttractionSchema = ObjectBase & {
  contact_person: string;
  type: string;
  price: number;
  description: string;
  video_url: string;
};

export type CulinaryPlace = ObjectBase & {
  location: LocationSchema;
  contact_person: string;
  capacity: number;
  open: Time;
  close: Time;
  description: string;
};

export type Facility = ObjectBase & {
  type_id: string;
  facility: FacilityType;
  price: number;
  category: number;
};

export type FacilityType = {
  id: string;
  type: string;
};

export type SouvenirPlaceSchema = ObjectBase & {
  location: LocationSchema;
  street: string;
  destination_id: string;
  contact_person: string;
  open: Time;
  close: Time;
  description: string;
};

export type TraditionalHouse = ObjectBase & {
  location: LocationSchema;
  contact_person: string;
  open: Time;
  close: Time;
  ticket_price: number;
  description: string;
  status: boolean;
};

export type WorshipPlaceSchema = ObjectBase & {
  location: LocationSchema;
  capacity: number;
  description: string;
  status: number;
};

export type SimplifiedObject = ObjectBase & {
  type?: string;
  price?: number;
  contact_person?: string;
  location?: LocationSchema;
  street?: string;
  capacity?: number;
  open?: string;
  close?: string;
  description?: string;
};

export type PackageReservationSchema = {
  id: string;
  rating: number;
  review: string;
  customer: {
    id: string;
    fullname: string;
  };
};

export type PackageDayFormSchema = yup.InferType<
  typeof packageDayFormSchema
> & {
  status: number;
};

export type PackageActivityFormSchema = yup.InferType<
  typeof detailPackageFormSchema
> & {
  activity_type: "A" | "CP" | "FC" | "SP" | "TH" | "WO";
};

export type Packages = PackageSchema & {
  packageDays: (PackageDay & {
    detailPackages: DetailPackageSchema[];
  })[];
};

export type PackageGallery = Packages & {
  packageGalleries: GalleryPackageSchema[];
};

export type PackageServiceGallery = PackageGallery & {
  detailServices: DetailServiceSchema[];
};

export type PackageService = Packages & {
  detailServices: DetailServiceSchema[];
};

export type EditPackageSchema = yup.InferType<typeof editPackageFormSchema> & {
  id?: string;
  price?: number;
  images: FilepondType;
  video_url: FilepondType;
};

export type PackageTypeFormSchema = yup.InferType<
  typeof packageTypeFormSchema
> & {
  id?: string;
};
