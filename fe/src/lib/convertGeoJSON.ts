 
import { MultiPolygon } from "geojson";

export const convertGeoJSON = (geojson: MultiPolygon) => {
  return geojson.coordinates[0].map(([lng, lat]) => ({ lat, lng }));
};
