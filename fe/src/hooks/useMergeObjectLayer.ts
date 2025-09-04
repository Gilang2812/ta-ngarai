import { ROUTES } from "@/data/routes";
import { useFetchObjectAround } from "@/features/web/common/useFetchObjectAround";
import useObjectAroundStore from "@/stores/ObjectAroundStore";

import { SimplifiedObject } from "@/type/schema/PackageSchema";
import { FeatureCollection } from "geojson";
import { useReformatObject } from "@/utils/map/objectUtils";
import { usePathname } from "next/navigation";

export const useObjectArround = () => {
  const pathName = usePathname();
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
  const { data: homestay, isLoading: isHomestayLoading } =
    useFetchObjectAround("homestay");
  const allObjectLayer: SimplifiedObject[] = [
    ...(layer.attraction ? attraction ?? [] : []),
    ...(layer.culinary ? culinary ?? [] : []),
    ...(layer.worship ? worship ?? [] : []),
    ...(layer.traditional ? traditional ?? [] : []),
    ...(pathName !== ROUTES.CRAFT
      ? layer.souvenir
        ? souvenir ?? []
        : []
      : []),
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

  return { objectGeom, isloading };
};
