import { apiKey } from "@/lib/googleMap";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";

const libraries = ["drawing"] as Libraries;
export const useMapLoad = () => {
  return useJsApiLoader({
    googleMapsApiKey: apiKey || "",
    libraries: libraries,
  });
};
