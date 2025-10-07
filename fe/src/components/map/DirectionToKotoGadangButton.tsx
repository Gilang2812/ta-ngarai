import { useDirections } from "@/hooks/useDirection";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { LatLngLiteral } from "@/types/common/MapType";
import { cornerAlert } from "@/utils/AlertUtils"; 
import { FaRoad } from "react-icons/fa6";
import { DirectionsRenderer } from "@react-google-maps/api";
import { useUserPositionStore } from "@/stores/UserPositionStore";
import ButtonTooltip from "../common/ButtonTooltip";

export const DirectionToKotoGadangButton = ({destination}:{destination?: string|LatLngLiteral|null}) => {
    const { directions, calculateDirections } = useDirections();
    const { userPosition } = useUserPositionStore();
    const handleClick = () => {
      if (!destination) {
        return cornerAlert("Set destination first");
      }
      calculateDirections({
        destination,
        origin: userPosition || LANDMARK_POSITION,
      });
    };

    return (
      <>
        <ButtonTooltip label="Get Directions to tho this place"
          variant="primary"
          onClick={handleClick}
          className="p-2"
          type="button"
        >
          <FaRoad />
        </ButtonTooltip>
        {directions && <DirectionsRenderer directions={directions} />}
      </>
    );
  };