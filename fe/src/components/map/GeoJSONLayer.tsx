import { useGoogleMap } from "@react-google-maps/api";
import { useEffect } from "react";

interface GeoJsonLayerProps {
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

    dataLayer.addGeoJson(data);

    dataLayer.setStyle((feature) => {
      const type = feature.getProperty("type");
      const name = feature.getProperty("name") || "indonesia";
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
        default:
          return {
            fillColor,
            strokeColor,
            fillOpacity: 0.4,
            strokeWeight: 1,
          };
      }
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
    return () => dataLayer.setMap(null);
  }, [map, data, onClick, onRightClick]);
  return null;
};

export default GeoJsonLayer;
