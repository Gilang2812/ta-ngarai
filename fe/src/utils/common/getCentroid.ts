import { LatLngLiteral } from "@/type/common/MapType";
import { Geometry, MultiPolygon } from "geojson";
import {centroid} from '@turf/turf'

export const getCentroid = (geom: MultiPolygon|Geometry):LatLngLiteral => {
  const center = centroid(geom)
  const [lng,lat] = center.geometry.coordinates;
  return { lat, lng };
};
