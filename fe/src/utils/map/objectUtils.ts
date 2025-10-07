import { SimplifiedObject } from "@/types/schema/PackageSchema";
import { type FeatureCollection } from "geojson";

export const useReformatObject = (
  data: SimplifiedObject[]
): FeatureCollection | null => {
  return data.length > 0
    ? {
        type: "FeatureCollection",
        features: data.map((item) => {
          return {
            type: "Feature",
            geometry: item.geom,
            properties: {
              id: item.id,
              name: item.name,
              type: item.type,
              price: item.price,
              contact_person: item.contact_person,
              address: item.address,
              capacity: item.capacity,
            },
          };
        }),
      }
    : null;
};
