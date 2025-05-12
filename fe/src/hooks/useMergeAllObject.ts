import { useFetchObjects } from "@/features/web/common/useFetchObjects";

import { type SimplifiedObject } from "@/type/schema/PackageSchema";
import { FeatureCollection } from "geojson";
import { ObjectDataType } from "@/data/object";
import { useReformatObject } from "@/utils/map/objectUtils";

export const useMergeALlObject = (layer: ObjectDataType) => {
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

  const allObjectLayer: SimplifiedObject[] = [
    ...(layer.attraction ? attraction ?? [] : []),
    ...(layer.culinary ? culinary ?? [] : []),
    ...(layer.souvenir ? souvenir ?? [] : []),
    ...(layer.traditional ? traditional ?? [] : []),
    ...(layer.worship ? worship ?? [] : []),
  ];

  const objectGeom: FeatureCollection | null =
    useReformatObject(allObjectLayer);
  const isloading =
    isAttractionLoading ||
    isCulinaryLoading ||
    isSouvenirLoading ||
    isTraditionalLoading ||
    isWorshipLoading;

  return { allObjectGeom: objectGeom, isloading };
};
