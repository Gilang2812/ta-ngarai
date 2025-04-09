import { useGoogleMap } from "@react-google-maps/api";
import { useEffect } from "react";

interface GeoJsonLayerProps {
  data: GeoJSON.FeatureCollection;
  style?: google.maps.Data.StyleOptions;
  onClick?: (feature: google.maps.Data.Feature) => void;
  onRightClick?: (feature: google.maps.Data.Feature) => void;
}
 export  const GeoJsonLayer = ({ data }: GeoJsonLayerProps) => {
    const map = useGoogleMap();

    useEffect(() => {
      if (!map || !data) return;
      const dataLayer = new google.maps.Data();

      dataLayer.addGeoJson(data);
      dataLayer.setMap(map);
      return () => dataLayer.setMap(null);
    }, [map, data]);
    return null;
  };