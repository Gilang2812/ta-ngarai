import { LatLngLiteral } from "@/type/common/MapType";
import { MultiPolygon } from "geojson";
import {centroid} from '@turf/turf'

export const getCentroid = (geom: MultiPolygon):LatLngLiteral => {
  const center = centroid(geom)
  const [lng,lat] = center.geometry.coordinates;
  return { lat, lng };
};
