"use client";
import { MapMarker } from "@/components/map";
import {
  getIconAndTextSecondLine,
  getIconAndTextThirdLine,
} from "@/components/map/ObjectInfoWindow";
import useDigitasi from "@/hooks/useDigitasi";
import useToggleOpen from "@/hooks/useToggleOpen";
import { SimplifiedObject } from "@/types/schema/PackageSchema";
import { getCentroid } from "@/utils/common/getCentroid";
import { getIconUrl } from "@/utils/map/getIconUrl";
import { InfoWindowF } from "@react-google-maps/api";

type MarkerProps = {
  properties: SimplifiedObject;
};
const ObjectGeom = ({ properties }: MarkerProps) => {
  const geom = properties.geom;
  const iconUrl = getIconUrl(properties.id);
  const { isOpen, toggle } = useToggleOpen();

  const { icon, text } = getIconAndTextSecondLine(properties);
  const { icon: thirdIcon, text: thirdText } =
    getIconAndTextThirdLine(properties);
  useDigitasi(properties.geom);
  return (
    <MapMarker
      icon={{
        url: iconUrl,
        scaledSize: new google.maps.Size(25.5, 34.5),
      }}
      position={getCentroid(geom)}
      onClick={toggle}
    >
      {isOpen && (
        <InfoWindowF options={{ maxWidth: 300 }} onCloseClick={toggle}>
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
          </article>
        </InfoWindowF>
      )}
    </MapMarker>
  );
};

export default ObjectGeom;
