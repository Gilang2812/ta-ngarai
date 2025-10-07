import { useFetchObjects } from "@/features/web/common/useFetchObjects";

import { type SimplifiedObject } from "@/types/schema/PackageSchema";
import { FeatureCollection } from "geojson";
import { ObjectDataType } from "@/data/object";
import { useReformatObject } from "@/utils/map/objectUtils";
import { ROUTES } from "@/data/routes";
import { usePathname } from "next/navigation";

export const useMergeALlObject = (layer: ObjectDataType) => {
  const pathName = usePathname();
  const { data: attraction, isLoading: isAttractionLoading } =
    useFetchObjects("attractions");
  const { data: culinary, isLoading: isCulinaryLoading } =
    useFetchObjects("culinary");

  const { data: souvenir, isLoading: isSouvenirLoading } =
    useFetchObjects("souvenirs");
  const { data: traditional, isLoading: isTraditionalLoading } =
    useFetchObjects("traditional");
  const { data: worship, isLoading: isWorshipLoading } =
    useFetchObjects("worship");
  const { data: homestay, isLoading: isHomestayLoading } =
    useFetchObjects("homestay");

  const allObjectLayer: SimplifiedObject[] = [
    ...(layer.attraction ? attraction ?? [] : []),
    ...(layer.culinary ? culinary ?? [] : []),
    ...(pathName !== ROUTES.CRAFT
      ? layer.souvenir
        ? souvenir ?? []
        : []
      : []),
    ...(layer.traditional ? traditional ?? [] : []),
    ...(layer.worship ? worship ?? [] : []),
    ...(layer.homestay ? homestay ?? [] : []),
  ];

  const objectGeom: FeatureCollection | null =
    useReformatObject(allObjectLayer);
  const isloading =
    isAttractionLoading ||
    isCulinaryLoading ||
    isSouvenirLoading ||
    isTraditionalLoading ||
    isWorshipLoading ||
    isHomestayLoading;

  return { allObjectGeom: objectGeom, isloading };
};
