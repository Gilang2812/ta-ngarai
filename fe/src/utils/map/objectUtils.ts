import { useTools } from "@/hooks/useTools"; 
import { SimplifiedObject, SouvenirPlaceSchema } from "@/type/schema/PackageSchema";
import { type FeatureCollection } from "geojson";

export const useReformatObject = (
  data: SimplifiedObject[]
): FeatureCollection | null => {
  const { open } = useTools();
  return open !== "around" && data.length > 0
    ? {
        type: "FeatureCollection",
        features: data.map((item) => {
          return {
            type: "Feature",
            geometry: item.geom,
            properties: {
              id:item.id,
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

export const useReformatSouvenirPlace = <T>(data: (SouvenirPlaceSchema & T)[]) => {
  return {
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
  };
};


