import React, { memo, useEffect, useRef } from "react";
import { GeoJsonLayerProps } from "./GeoJSONLayer";
import { Geometry } from "geojson";
import { getCentroid } from "@/utils/common/getCentroid";
import { useUserPositionStore } from "@/stores/UserPositionStore";
import { useInfoWindow } from "@/hooks/useInfoWindow";
import { MarkerObject } from "./MarkerObject";
import { useGoogleMap } from "@react-google-maps/api";
import { SimplifiedObject } from "@/type/schema/PackageSchema";
import { getIconUrl } from "@/utils/map/getIconUrl";

type Props = GeoJsonLayerProps;

const ObjectGeoJSON = ({ data }: Props) => {
  const map = useGoogleMap(); 
  const hasFitBounds = useRef(false);
  const { radius, userPosition } = useUserPositionStore();
  const { open, toggleInfoWindow } = useInfoWindow();
  useEffect(() => {
    if (!map || !data) return; 
    const dataObject = new google.maps.Data();
    dataObject.addGeoJson(data);
    dataObject.setMap(map);

    dataObject.setStyle({
      fillColor: "red",
      strokeWeight: 1,
      strokeColor: "white",
      fillOpacity: 0.1,
    });

    const bounds = new google.maps.LatLngBounds();
    if (!userPosition && !hasFitBounds.current) {
      data.features.forEach((feature) => {
        if (feature.geometry) {
          const { lat, lng } = getCentroid(feature.geometry as Geometry);
          const marker = new google.maps.Marker({
            title: "itu lah",
            position: { lat, lng },
          });
          if (marker) bounds.extend({ lat, lng });
        }
      });

      if (!radius) {
        map.fitBounds(bounds);
      }
      hasFitBounds.current = true;
    }

    return () => dataObject.setMap(null);
  }, [map, data, radius, userPosition]);

  return (
    data &&
    data.features.map((feature, index) => {
      if (feature.geometry) {
        const { lat, lng } = getCentroid(feature.geometry as Geometry);
        const properties = feature?.properties as SimplifiedObject;

        return (
          <MarkerObject
            open={open}
            iconUrl={getIconUrl(properties?.id)}
            toggleInfoWindow={toggleInfoWindow}
            index={index}
            position={{ lat, lng }}
            key={index}
            properties={properties}
          />
        );
      }
    })
  );
};
ObjectGeoJSON.displayName = "ObjectGeoJSON";
export default memo(ObjectGeoJSON);
