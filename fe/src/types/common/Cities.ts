import { LatLngLiteral } from "./MapType";

export type City = {
  name: string;
  type: "plane" | "bus";
  coords: LatLngLiteral;
  routes: string[];
  iconUrl?: string;
};
