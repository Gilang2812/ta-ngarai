import { InfoWindow } from "@react-google-maps/api";
import React from "react";
import { DirectionToKotoGadangButton } from "./DirectionToKotoGadangButton";
import Button from "../common/Button";
import Link from "next/link";
import { FaInfo } from "react-icons/fa";
import { SimplifiedObject } from "@/type/schema/PackageSchema";
import { useDirectionStore } from "@/stores/DirectionStore";
import useTravelRoute from "@/hooks/useTravelRoute";
import ButtonTooltip from "../common/ButtonTooltip";
import { linkObject } from "@/lib/linkObject";
import { FaPlus } from "react-icons/fa6";
import {
  getIconAndTextSecondLine,
  getIconAndTextThirdLine,
} from "./ObjectInfoWindow";
import { ROUTES } from "@/data/routes";
import useUserRole from "@/hooks/useUserRole";

type Props = {
  object: SimplifiedObject;
  onCloseClick: () => void;
  position: google.maps.LatLngLiteral;
  book_homestay?: boolean;

  anchor?: google.maps.Marker | null;
};

const InfoWindowObject = ({
  object,
  onCloseClick,
  position,
  book_homestay = true,
  anchor,
}: Props) => {
  const { setResponse } = useDirectionStore();
  const { routes, handleAddUniqueRoute } = useTravelRoute();
  const { icon, text } = getIconAndTextSecondLine(object);
  const { icon: thirdIcon, text: thirdText } = getIconAndTextThirdLine(object);
  const { isUserAuth } = useUserRole();
  return (
    <InfoWindow
      options={{ maxWidth: 300 }}
      onCloseClick={() => {
        onCloseClick();
        if (!(routes.length > 1)) {
          setResponse(null);
        }
      }}
      anchor={anchor || undefined}
    >
      <article className="space-y-2 p-2   rounded text-center [&_h3]:font-bold">
        <h3>{object.name}</h3>
        {object.id}
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
            <Link href={linkObject(object.id)}>
              <FaInfo />
            </Link>
          </Button>
          {routes.length > 0 && (
            <ButtonTooltip
              onClick={() =>
                handleAddUniqueRoute({
                  id: object.id,
                  name: object.name,
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
        {book_homestay && object.id.startsWith("HO") && (
          <section className="w-full flex items-center justify-center">
            <Button disabled={!isUserAuth} variant={"success"} asChild>
              {isUserAuth ? (
                <Link href={ROUTES.HOMESTAY_RESERVATION(object.id)}>
                  Book Now
                </Link>
              ) : (
                "Book Now"
              )}
            </Button>
          </section>
        )}
      </article>
    </InfoWindow>
  );
};

export default InfoWindowObject;
