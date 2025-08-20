import { MultiPolygon } from "geojson";

export type Attraction = {
  id?: string;
  name: string;
  type: string;
  price: number;
  category: number;
  min_capacity: number;
  description: string;
  video_url?: string;
  geom?: MultiPolygon;
};
