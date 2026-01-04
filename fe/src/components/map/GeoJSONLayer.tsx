
import { LAYER_STYLES } from "@/data/layerStyles";
import { STROKE_COLOR } from "@/data/strokeColor";
import { useAttachmentStore } from "@/stores/attachmentStore";
import { useGoogleMap } from "@react-google-maps/api";
import React, { useEffect } from "react";

export interface GeoJsonLayerProps {
  data: GeoJSON.FeatureCollection;
  style?: google.maps.Data.StyleOptions;
  onClick?: (feature: google.maps.Data.Feature) => void;
  onRightClick?: (feature: google.maps.Data.Feature) => void;
}
const GeoJsonLayer = ({ data, onClick, onRightClick }: GeoJsonLayerProps) => {
  const { setCursorPos } = useAttachmentStore()
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
    dataLayer.addListener('mousemove', (event: google.maps.Data.MouseEvent) => {
      setCursorPos({
        lat: event.latLng!.lat(),
        lng: event.latLng!.lng(),

      })
    })
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
          switch (name.toLowerCase()) {
            case "malaysia":
              fillColor = LAYER_STYLES.MALAYSIA.background;
              break;
            case "singapore":
              fillColor = LAYER_STYLES.SINGAPORE.background;
              break;
            case "brunei":
              fillColor = LAYER_STYLES.BRUNEI.background;
              break;

          }
          return {
            fillColor,
            strokeColor: STROKE_COLOR.international,
            fillOpacity,
            strokeWeight,
          };
        case "provinsi":
          return {
            fillColor: LAYER_STYLES.PROVINCE.background,
            strokeColor: STROKE_COLOR.provincial,
            fillOpacity,
            strokeWeight,
          };
        case "kab_kota":
          return {
            fillColor: LAYER_STYLES.REGENCY.background,
            strokeColor: STROKE_COLOR.regency,
            fillOpacity,
            strokeWeight,
          };
        case "kecamatan":
          return {
            fillColor: LAYER_STYLES.DISTRICT.background,
            strokeColor: STROKE_COLOR.district,
            fillOpacity,
            strokeWeight,
          };
        case "village":
          return {
            fillColor: LAYER_STYLES.VILLAGE.background,
            strokeColor: STROKE_COLOR.village,
            fillOpacity,
            strokeWeight,
          };
        case "tourism":
          return {
            fillColor: LAYER_STYLES.TOURISM.background,
            strokeColor: STROKE_COLOR.tourism,
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
    };
  }, [map, data, onClick, onRightClick, setCursorPos]);
  return null;
};
GeoJsonLayer.displayName = "GeoJsonLayer";
export default React.memo(GeoJsonLayer);
