import { MultiPolygon } from "geojson";
import { FilepondType } from "../common/FilepondType";

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

export type CulinaryPlace = {
  id: string;
  name: string;
  address: string;
  contact_person: string;
  open: string;
  close: string;
  capacity: number;
  description: string;
  status: number;
  geom?: MultiPolygon | string;
};

export type CulinarySchema = CulinaryPlace & {
  galleries: GalleryCulinary[];
};

export type CulinaryForm = CulinaryPlace & {
  images: FilepondType;
};

export type WorshipPlace = {
  id: string;
  name: string;
  address: string;
  capacity: number;
  description: string;
  status: number;
  geom?: MultiPolygon | string;
};

export type WorshipSchema = WorshipPlace & {
  galleries: GalleryWorship[];
};

export type WorshipForm = WorshipPlace & {
  images: FilepondType;
};
