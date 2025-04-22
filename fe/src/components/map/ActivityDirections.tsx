import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import DirectionsPair from "./DirectionPair";
import { useDirectionStore } from "@/stores/DirectionStore";
import { getCentroid } from "@/utils/common/getCentroid";

export const ActivityDirections = ({
  hideAllLayer,
}: {
  hideAllLayer: () => void;
}) => {
  const { objects, direction, origin, destination, setDirection, clearOption } =
    useDirectionStore();

  const handleCallback = (
    result: google.maps.DirectionsResult | null,
    status: string
  ) => {
    if (status === "OK" && result) {
      setDirection(result);
      hideAllLayer();
    }
    clearOption();
  };
  const wayPoints = objects.map((ob) => getCentroid(ob.geom));
  return (
    <>
      {origin && destination && (
        <DirectionsService
          key="main"
          options={{
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
          }}
          callback={handleCallback}
        />
      )}

      {direction && <DirectionsRenderer directions={direction} />}
      {wayPoints.length > 0 &&
        wayPoints.map((_, index) => {
          if (index === 0) return;
          return (
            <DirectionsPair
              key={index}
              hideAllLayer={hideAllLayer}
              destination={wayPoints[index]}
              origin={wayPoints[index - 1]}
            />
          );
        })}
    </>
  );
};
