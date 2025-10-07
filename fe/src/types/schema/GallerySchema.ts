export type GallerySchema = {
  id: string | undefined;
  tourism_village_id: string;
  url: string;
};

export type GalleryPackageSchema = {
  id: string;
  package_id: string;
  url: string;
};

export type GallerySouvenir = {
  id: string;
  souvenir_place_id: string;
  url: string;
};
