// import Weather from "@/components/weather/Weather";
import Map from "@/components/web/MapHome";
import MapControls from "../global/MapControls";

export default function MapSection() {
  return (
    <>
      <div className="flex h-full basis-auto">
        <Map />
      </div>
    </>
  );
}
