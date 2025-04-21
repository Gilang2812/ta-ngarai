import { Polyline } from "@react-google-maps/api";

export const CustomPolyline = ({ path }: { path: google.maps.LatLng[] }) => (
  <Polyline
    path={path}
    options={{
      strokeColor: "#3b82f6",
      strokeOpacity: 0.8,
      strokeWeight: 2,
    }}
  />
);
