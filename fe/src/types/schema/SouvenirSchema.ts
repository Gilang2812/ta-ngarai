import { GallerySouvenir } from "./GallerySchema";
import { SouvenirPlaceSchema } from "./PackageSchema";

export type UserMarketplaceSchema = SouvenirPlaceSchema & {
  galleries: GallerySouvenir[];
  detailSouvenir: DetailUserSouvenir[];
};

export type DetailSouvenir = {
  user_id: string;
  id_souvenir_place: string;
  status: number;
};

export type DetailUserSouvenir = DetailSouvenir & {
  user: User;
};

export type User = {
  id: string;
  username: string;
  email: string;
  fullname: string;
  user_image: string;
};

export type DetailUserSouvenirPlace = DetailSouvenir & {
  souvenirPlace: { id: string; name: string };
};
