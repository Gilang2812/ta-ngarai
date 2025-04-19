// import Weather from "@/components/weather/Weather";
// import Map from "@/components/web/MapHome";
import { ToggleType } from "@/type/common/ToggleType";
import MapWeb from "./MapWeb";

export default function MapSection() {
  return (
    <>
      <div className="flex flex-col bg-white rounded-xl p-5 h-full basis-auto">
        <h4>Google Maps With location</h4>
        <MapWeb  />
      </div>
    </>
  );
}
