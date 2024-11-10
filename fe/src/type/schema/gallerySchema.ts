import { PackageSchema } from "./detailPackage";

export type GallerySchema = {
  id: string;
  tourism_village_id: string;
  url: string;
};

export type GalleryPackageSchema = {
  id: string;
  package_id: string;
  url: string;
  Package?: PackageSchema;
};
