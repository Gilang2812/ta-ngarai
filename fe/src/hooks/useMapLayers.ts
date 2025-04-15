import { useFetchCountry } from "@/features/map/useFetchCountry";
import { useFetchKabKota } from "@/features/map/useFetchKabKota";
import { useFetchKecamatan } from "@/features/map/useFetchKecamatan";
import { useFetchProvince } from "@/features/map/useFetchProvince";
import { useFetchVillage } from "@/features/map/useFetchVillage";
import { useMergeGeoJSON } from "./useMergeGeoJSON";

export const useMapLayer = (layers: Record<string, boolean>) => {
  const { data: country, isLoading: isCountryLoading } = useFetchCountry(
    layers.country
  );
  const { data: province, isLoading: isProvinceLoading } = useFetchProvince(
    layers.province
  );
  const { data: kabKota, isLoading: isKabKotaLoading } = useFetchKabKota(
    layers.city
  );
  const { data: kecamatan, isLoading: isKecamatanLoading } = useFetchKecamatan(
    layers.district
  );
  const { data: village, isLoading: isVillageLoading } = useFetchVillage(
    layers.village
  );
  const isLoading =
    isCountryLoading ||
    isProvinceLoading ||
    isKabKotaLoading ||
    isKecamatanLoading ||
    isVillageLoading;
  const mergedRegions = useMergeGeoJSON([
    layers.country ? country : null,
    layers.province ? province : null,
    layers.city ? kabKota : null,
    layers.district ? kecamatan : null,
    layers.village ? village : null,
  ]);

  return { isLoading, mergedRegions };
};
