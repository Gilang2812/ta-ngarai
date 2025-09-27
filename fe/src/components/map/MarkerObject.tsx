import { type LatLngLiteral } from "@/type/common/MapType";
import MapMarker from "./MapMarker";
import { type SimplifiedObject } from "@/type/schema/PackageSchema";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTools } from "@/hooks/useTools";
import InfoWindowObject from "./InfoWindowObject";

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
  const pathName = usePathname();
  const markersRef = useRef<(google.maps.Marker | null)[]>([]);

  const {
    setObjectId,
    togglePackage,
    packageOpen,
    aroundOpen,
    object_id: selectedObject,
  } = useTools();

  const handleClickMarker = (index: number, object_id: string) => {
    toggleInfoWindow(index);
    setObjectId(object_id);
    if ((!packageOpen || !object_id) && !aroundOpen) {
      if (!!selectedObject || !!object_id) {
        togglePackage();
      }
    }
  };

  useEffect(() => {
    setObjectId("");
  }, [pathName, setObjectId]);

  return (
    <MapMarker
      icon={{
        url: iconUrl,
        scaledSize: new google.maps.Size(25.5, 34.5),
      }}
      onClick={() => handleClickMarker(index, properties.id)}
      position={position}
      onLoad={(marker) => {
        markersRef.current[index] = marker;
      }}
    >
      {open === index && (
        <InfoWindowObject
          object={properties}
          onCloseClick={() => {
            handleClickMarker(index, "");
          }}
          position={position}
          anchor={markersRef.current[index]}
        />
      )}
    </MapMarker>
  );
};
