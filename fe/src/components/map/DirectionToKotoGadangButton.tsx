import { useDirections } from "@/hooks/useDirection";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { LatLngLiteral } from "@/type/common/MapType";
import { cornerAlert } from "@/utils/AlertUtils";
import Button from "../common/Button";
import { FaRoad } from "react-icons/fa6";
import { DirectionsRenderer } from "@react-google-maps/api";

export const DirectionToKotoGadangButton = ({origin}:{origin?: string|LatLngLiteral|null}) => {
    const { directions, calculateDirections } = useDirections();

    const handleClick = () => {
      if (!origin) {
        return cornerAlert("Set location first");
      }
      calculateDirections({
        destination: LANDMARK_POSITION,
        origin,
      });
    };

    return (
      <>
        <Button
          variant="primary"
          onClick={handleClick}
          className="p-2"
          type="button"
        >
          <FaRoad />
        </Button>
        {directions && <DirectionsRenderer directions={directions} />}
      </>
    );
  };