import { LatLngLiteral } from "@/type/common/MapType";
import MapMarker from "./MapMarker";
import { InfoWindowF } from "@react-google-maps/api";
import {
  FaAddressBook,
  FaInfo,
  FaMapPin,
  FaMoneyBill,
  FaPersonPraying,
  FaPlus,
  FaSpa,
} from "react-icons/fa6";
import { DirectionToKotoGadangButton } from "./DirectionToKotoGadangButton";
import { SimplifiedObject } from "@/type/schema/PackageSchema";
import Button from "../common/Button";
import Link from "next/link";
import useTravelRoute from "@/hooks/useTravelRoute";
import ButtonTooltip from "../common/ButtonTooltip";
import { ROUTES } from "@/data/routes";
import useUserRole from "@/hooks/useUserRole";

type MarkerProps = {
  position: LatLngLiteral;
  index: number;
  open: number | null;
  iconUrl: string;
  toggleInfoWindow: (index: number) => void;
  properties: SimplifiedObject;
};
export const MarkerObject = ({
  position,
  index,
  open,
  iconUrl,
  toggleInfoWindow,
  properties,
}: MarkerProps) => {
  const getIconAndTextSecondLine = () => {
    if (properties.type !== undefined) {
      return { icon: <FaSpa />, text: properties.type };
    } else if (properties.contact_person !== undefined) {
      return { icon: <FaAddressBook />, text: properties.contact_person };
    } else if (properties.capacity !== undefined) {
      return { icon: <FaPersonPraying />, text: properties.capacity };
    } else {
      return { icon: <FaSpa />, text: "object " };
    }
  };
  const getIconAndTextThirdLine = () => {
    if (properties.type !== undefined) {
      return { icon: <FaMoneyBill />, text: properties.price };
    } else if (properties.contact_person !== undefined) {
      return { icon: <FaMapPin />, text: properties.address };
    } else {
      return { icon: <FaMoneyBill />, text: "free" };
    }
  };

  const { icon, text } = getIconAndTextSecondLine();
  const { icon: thirdIcon, text: thirdText } = getIconAndTextThirdLine();
  const { routes, handleAddUniqueRoute } = useTravelRoute();
  const { isUserAuth } = useUserRole();

  return (
    <MapMarker
      icon={{
        url: iconUrl,
        scaledSize: new google.maps.Size(25.5, 34.5),
      }}
      onClick={() => toggleInfoWindow(index)}
      position={position}
    >
      {open === index && (
        <InfoWindowF
          options={{ maxWidth: 300 }}
          onCloseClick={() => toggleInfoWindow(index)}
        >
          <article className="space-y-2 p-2   rounded text-center [&_h3]:font-bold">
            <h3>{properties.name}</h3>
            {properties.id}
            <section className="text-sm flex gap-2 items-center justify-center">
              {icon}
              <p>{text}</p>
            </section>
            <section className="text-sm gap-2 flex items-start justify-center ">
              {thirdIcon}
              <p>{thirdText}</p>
            </section>
            <section className="flex items-center justify-center gap-2">
              <DirectionToKotoGadangButton destination={position} />
              <Button className="p-2" variant={"primary"} asChild>
                <Link href={"/web/explore"}>
                  <FaInfo />
                </Link>
              </Button>
              {routes.length > 0 && (
                <ButtonTooltip
                  onClick={() =>
                    handleAddUniqueRoute({
                      id: properties.id,
                      name: properties.name,
                      lat: position.lat,
                      lng: position.lng,
                    })
                  }
                  variant={"regSuccess"}
                  label="Add to Route"
                >
                  <FaPlus /> Add
                </ButtonTooltip>
              )}
            </section>
            {properties.id.startsWith("HO") && (
              <section className="w-full flex items-center justify-center">
                <Button disabled={!isUserAuth} variant={"success"} asChild>
                  {isUserAuth ? (
                    <Link href={ROUTES.HOMESTAY_RESERVATION(properties.id)}>
                      Book Now
                    </Link>
                  ) : (
                    "Book Now"
                  )}
                </Button>
              </section>
            )}
          </article>
        </InfoWindowF>
      )}
    </MapMarker>
  );
};
