import { useFetchObjectAround } from "@/features/web/common/useFetchObjectAround";
import useObjectAroundStore from "@/stores/ObjectAroundStore";

import { SimplifiedObject } from "@/type/schema/PackageSchema";
import { FeatureCollection } from "geojson";
import { useReformatObject } from "@/utils/map/objectUtils";

export const useObjectArround = () => {
  const { object: layer } = useObjectAroundStore();
  const { data: attraction, isLoading: isAttractionLoading } =
    useFetchObjectAround("attractions");
  const { data: culinary, isLoading: isCulinaryLoading } =
    useFetchObjectAround("culinary");

  const { data: souvenir, isLoading: isSouvenirLoading } =
    useFetchObjectAround("souvenirs");
  const { data: traditional, isLoading: isTraditionalLoading } =
    useFetchObjectAround("traditional");
  const { data: worship, isLoading: isWorshipLoading } =
    useFetchObjectAround("worship");

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

  return { objectGeom, isloading };
};
