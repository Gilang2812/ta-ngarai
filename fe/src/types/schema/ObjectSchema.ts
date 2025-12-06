import { MultiPolygon } from "geojson";
import { FilepondType } from "../common/FilepondType";
import { LocationSchema } from "./LocationSchema";

export type Attraction = {
  id: string;
  name: string;
  type: string;
  price: number;
  category: 1 | 2;
  min_capacity: number;
  description: string;
  video_url?: string;
  geom?: MultiPolygon | string;
};
export type AttractionForm = Attraction & {
  images: FilepondType;
};

export type GalleryAttraction = {
  id: string;
  attraction_id: string;
  url: string;
};

export type AttractionSchema = Attraction & {
  galleries: GalleryAttraction[];
};

export type GalleryCulinary = {
  id: string;
  culinary_place_id: string;
  url: string;
};

export type GalleryWorship = {
  id: string;
  worship_place_id: string;
  url: string;
};

export type GalleryTraditional = {
  id: string;
  traditional_house_id: string;
  url: string;
};

export type CulinaryPlace = {
  id: string;
  name: string;
  location: LocationSchema;
  contact_person: string;
  open: string;
  close: string;
  capacity: number;
  description: string;
  status: number;
  video_url?: string;
  geom?: MultiPolygon | string;
};

export type TraditionalHouse = {
  id: string;
  name: string;
  location: LocationSchema;
  street: string;
  contact_person: string;
  ticket_price: number;
  category: 1 | 2;
  min_capacity: number;
  open: string;
  close: string;
  description: string;
  status?: number;
  video_url?: string;
  geom?: MultiPolygon | string;
};

export type CulinarySchema = CulinaryPlace & {
  galleries: GalleryCulinary[];
};

export type CulinaryForm = {
  id: string;
  name: string;
  country: string;
  district: string;
  province: string;
  regency: string;
  village: string;
  postal_code: string;
  street: string;
  contact_person: string;
  open: string;
  close: string;
  capacity: number;
  description: string;
  status: number;
  video_url?: string;
  geom?: MultiPolygon | string;
  images: FilepondType;
};

export type WorshipPlace = {
  id: string;
  name: string;
  location: LocationSchema;
  street: string;
  capacity: number;
  description: string;
  status: number;
  geom?: MultiPolygon | string;
};

export type WorshipSchema = WorshipPlace & {
  galleries: GalleryWorship[];
};

export type WorshipForm = {
  id: string;
  name: string;
  country: string;
  district: string;
  province: string;
  regency: string;
  village: string;
  postal_code: string;
  street: string;
  contact_person: string;
  open: string;
  close: string;
  capacity: number;
  description: string;
  status: number;
  geom?: MultiPolygon | string;
  images: FilepondType;
};

export type TraditionalSchema = TraditionalHouse & {
  galleries: GalleryTraditional[];
};

export type TraditionalForm = {
  id: string;
  name: string;
  country: string;
  district: string;
  province: string;
  regency: string;
  village: string;
  postal_code: string;
  street: string;
  contact_person: string;
  ticket_price: number;
  category: 1 | 2;
  min_capacity: number;
  open: string;
  close: string;
  description: string;
  status?: number;
  video_url?: string;
  geom?: MultiPolygon | string;
  images: FilepondType;
};
