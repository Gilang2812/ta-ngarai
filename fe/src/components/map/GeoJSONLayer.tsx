import { useGoogleMap } from "@react-google-maps/api";
import React, { useEffect } from "react";

export interface GeoJsonLayerProps {
  data: GeoJSON.FeatureCollection;
  style?: google.maps.Data.StyleOptions;
  onClick?: (feature: google.maps.Data.Feature) => void;
  onRightClick?: (feature: google.maps.Data.Feature) => void;
}
const GeoJsonLayer = ({ data, onClick, onRightClick }: GeoJsonLayerProps) => {
  const map = useGoogleMap();
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 70%, 80%)`;
  };

  useEffect(() => {
    if (!map || !data) return;
    const dataLayer = new google.maps.Data({ map });
    const specialLayer = new google.maps.Data({ map });

    dataLayer.addGeoJson({
      ...data,
      features: data.features.filter(
        (f) =>
          !(
            (f.properties?.type === "village" &&
              String(f.properties?.name).toLowerCase() === "koto gadang") ||
            (f.properties?.type === "kab_kota" &&
              String(f.properties?.name).toLowerCase() === "agam")
          )
      ),
    });
    dataLayer.setStyle((feature) => {
      const type = feature.getProperty("type");
      const name = String(feature.getProperty("name")) || "indonesia";
      let fillColor = "#f94144";
      const strokeColor = "#fccfcf";
      const fillOpacity = 0.4;
      const strokeWeight = 1;
      if (type === "negara") {
        fillColor = stringToColor(name.toString());
      }

      switch (type) {
        case "negara":
          return {
            fillColor,
            strokeColor,
            fillOpacity,
            strokeWeight,
          };
        case "provinsi":
          return {
            fillColor: "#f3722c",
            strokeColor,
            fillOpacity,
            strokeWeight,
          };
        case "kab_kota":
          return {
            fillColor: "#f9c74f",
            strokeColor,
            fillOpacity,
            strokeWeight,
          };
        case "kecamatan":
          return {
            fillColor: "#90be6d",
            strokeColor,
            fillOpacity,
            strokeWeight,
          };
        case "village":
          return {
            fillColor: "#577590",
            strokeColor,
            fillOpacity,
            strokeWeight,
          };
        case "tourism":
          return {
            fillColor: "#43aa8b",
            strokeColor: fillColor,
            fillOpacity: 0,
            strokeWeight: 3,
          };
        default:
          return {
            fillColor,
            strokeColor,
            fillOpacity: 0.4,
            strokeWeight: 1,
          };
      }
    });
    specialLayer.setStyle({
      fillColor: "#43aa8b",
      strokeColor: "#43aa8b",
      fillOpacity: 0, // transparan
      strokeWeight: 2,
    });
    if (onClick) {
      dataLayer.addListener("click", (event: google.maps.Data.MouseEvent) => {
        onClick(event.feature);
      });
    }
    if (onRightClick) {
      dataLayer.addListener(
        "rightclick",
        (event: google.maps.Data.MouseEvent) => {
          onRightClick(event.feature);
        }
      );
    }
    return () => {
      dataLayer.setMap(null);
      specialLayer.setMap(null);
    };
  }, [map, data, onClick, onRightClick]);
  return null;
};
GeoJsonLayer.displayName = "GeoJsonLayer";
export default React.memo(GeoJsonLayer);
