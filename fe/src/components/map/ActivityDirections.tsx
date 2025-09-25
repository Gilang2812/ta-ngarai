import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import DirectionsPair from "./DirectionPair";
import { useDirectionStore } from "@/stores/DirectionStore";
import { getCentroid } from "@/utils/common/getCentroid";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";

export const ActivityDirections = ({
  hideAllLayer,
}: {
  hideAllLayer?: () => void;
}) => {
  const { objects, direction, origin, destination, setDirection, clearOption } =
    useDirectionStore();
  const { setResponse: setResponseDirection } = useDirectionStore();

  const handleCallback = (
    result: google.maps.DirectionsResult | null,
    status: string
  ) => {
    clearOption();
    if (status === "OK" && result) {
      setDirection(result);
      console.log(result);
      setResponseDirection(result);
      hideAllLayer?.();
    }
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
      {wayPoints.length > 0 && (
        <DirectionsPair
          hideAllLayer={hideAllLayer}
          destination={LANDMARK_POSITION}
          origin={wayPoints[wayPoints.length - 1]}
          waypoints={wayPoints.slice(0, wayPoints.length - 1)}
        />
      )}
    </>
  );
};
