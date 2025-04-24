import { ObjectDataType } from "@/data/object";
import { useFetchObjectAround } from "@/features/web/common/useFetchObjectAround";
import { useUserPositionStore } from "@/stores/UserPositionStore";

export const useObjectLayer = (layer: ObjectDataType) => {
  const { userPosition, radius } = useUserPositionStore();

  const { data: attraction } = useFetchObjectAround(
    "attractions",
    userPosition?.lat,
    userPosition?.lng,
    radius
  );
  const { data: culinary } = useFetchObjectAround(
    "culinary",
    userPosition?.lat,
    userPosition?.lng,
    radius
  );

  const { data: souvenir } = useFetchObjectAround(
    "souvenirs",
    userPosition?.lat,
    userPosition?.lng,
    radius
  );
  const { data: traditional } = useFetchObjectAround(
    "traditional",
    userPosition?.lat,
    userPosition?.lng,
    radius
  );
  const { data: worship } = useFetchObjectAround(
    "worship",
    userPosition?.lat,
    userPosition?.lng,
    radius
  );

  const allObjectLayer = [
    ...(layer.attraction ? attraction : []),
    ...(layer.culinary ? culinary : []),
    ...(layer.souvenir ? souvenir : []),
    ...(layer.traditional ? traditional : []),
    ...(layer.worship ? worship : []),
  ];

  return { allObjectLayer };
};
