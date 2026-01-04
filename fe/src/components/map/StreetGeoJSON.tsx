import { getCentroid } from "@/utils/common/getCentroid";
import { OverlayView, useGoogleMap } from "@react-google-maps/api";
import { useEffect } from "react";

interface StreetGeoJSONProps {
  data?: GeoJSON.FeatureCollection | null;
}
const StreetGeoJSON = ({ data }: StreetGeoJSONProps) => {
  const map = useGoogleMap();
  console.log("StreetGeoJSON data:", data);
  useEffect(() => {
    if (!map || !data) return;
    const dataLayer = new google.maps.Data({ map });
    dataLayer.addGeoJson(data);
    dataLayer.setStyle((feature) => {
      const geometryType = feature.getGeometry()?.getType();
      if (geometryType === "MultiLineString" || geometryType === "LineString") {
        return {
          strokeColor: "#4285F4",
          strokeWeight: 4,
        };
      }
      return {};
    });
    return () => {
      dataLayer.setMap(null);
    };
  }, [map, data]);

  return null;
  data?.features?.map((street, index) => (
    <OverlayView
      key={index}
      position={getCentroid(street.geometry)}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <p
        className={`
           text-white [-webkit-text-fill-color:white] [-webkit-text-stroke:1px_black]
          font-sans transition w-fit font-extrabold text-xs whitespace-nowrap p-2 -translate-x-1/2 -translate-y-1/2`}
      >
        {street.properties?.name}
      </p>

    </OverlayView>))
}
export default StreetGeoJSON;
