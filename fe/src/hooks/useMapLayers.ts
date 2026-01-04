import { useFetchCountry } from "@/features/map/useFetchCountry";
import { useFetchKabKota } from "@/features/map/useFetchKabKota";
import { useFetchKecamatan } from "@/features/map/useFetchKecamatan";
import { useFetchProvince } from "@/features/map/useFetchProvince";
import { useFetchVillage } from "@/features/map/useFetchVillage";
import { useMergeGeoJSON } from "./useMergeGeoJSON";
import { LayerType } from "@/data/layers";
import { useFetchStreet } from "@/features/map/useFetchStreet";

export const useMapLayer = (layers: LayerType) => {
  console.log("useMapLayers called with layers:", layers);
  const { data: country, isLoading: isCountryLoading } = useFetchCountry(
    layers.country
  );
  const { data: province, isLoading: isProvinceLoading } = useFetchProvince();
  const { data: kabKota, isLoading: isKabKotaLoading } = useFetchKabKota(
    layers.city
  );
  const { data: kecamatan, isLoading: isKecamatanLoading } = useFetchKecamatan(
    layers.district
  );
  const { data: village, isLoading: isVillageLoading } = useFetchVillage(
    layers.village
  );

  const { data: street, isLoading: isStreetLoading } = useFetchStreet();

  const tourismVillage = village
    ? {
        ...village,
        features: village.features
          .filter(
            (feature) =>
              String(feature.properties?.name).toLowerCase() === "koto gadang"
          )
          .map((f) => ({
            ...f,
            properties: { ...f.properties, type: "tourism" },
          })),
      }
    : null;

  const isLoading =
    isCountryLoading ||
    isProvinceLoading ||
    isKabKotaLoading ||
    isKecamatanLoading ||
    isStreetLoading ||
    isVillageLoading;
  const mergedRegions = useMergeGeoJSON([
    layers.tourism ? tourismVillage : null,
    layers.country ? country : null,
    layers.province ? province : null,
    layers.city ? kabKota : null,
    layers.district ? kecamatan : null,
    layers.village ? village : null,
  ]);

  const streetlayer = layers.street ? street : null;

  return { isLoading, mergedRegions, streetlayer };
};
