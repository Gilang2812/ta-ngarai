import { MultiPolygon } from "geojson";
import { Time } from "../common/TimeType";

export type PackageTypeSchema = {
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
  day: string;
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
  object: ObjectSchema;
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
  address: string;
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
  address: string;
  contact_person: string;
  open: Time;
  close: Time;
  description: string;
};

export type TraditionalHouse = ObjectBase & {
  address: string;
  contact_person: string;
  open: Time;
  close: Time;
  ticket_price: number;
  description: string;
  status: boolean;
};

export type WorshipPlaceSchema = ObjectBase & {
  address: string;
  capacity: number;
  description: string;
  status: number;
};

export type SimplifiedObject = ObjectBase & {
  type?: string;
  price?: number;
  contact_person?: string;
  address?: string;
  capacity?: number;
};
