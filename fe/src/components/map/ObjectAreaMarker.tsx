import { useDirectionStore } from "@/stores/DirectionStore";
import MapMarker from "./MapMarker";
import { getCentroid } from "@/utils/common/getCentroid";

export const ObjectAreaMarker = () => {
  const { objects } = useDirectionStore();
  return objects.length > 0 && objects.map((ob, index) => (
    <MapMarker label={{ text: (String.fromCharCode(65 + index)) }} key={index} position={getCentroid(ob.geom)} />
  ));
};
