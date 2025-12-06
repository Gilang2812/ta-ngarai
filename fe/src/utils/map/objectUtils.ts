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
              location: {
                country: item?.location?.country,
                district: item?.location?.district,
                province: item?.location?.province,
                regency: item?.location?.regency,
                village: item?.location?.village,
                postal_code: item?.location?.postal_code,
              },
              street: item?.street,
              capacity: item.capacity,
            } as SimplifiedObject,
          };
        }),
      }
    : null;
};
