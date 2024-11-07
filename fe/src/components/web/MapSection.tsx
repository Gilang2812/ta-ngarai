// import Weather from "@/components/weather/Weather";
import Map from "@/components/web/MapHome";
import MapControls from "./MapControls";

export default function MapSection() {
  return (
    <>
      <header className="flex gap-8 text-lg">
        <h1>Google Maps With Location</h1>
        <MapControls />
      </header>
      {/* <Weather /> */}
      <div className="flex h-full grow shrink basis-auto">
        <Map />
      </div>
    </>
  );
}
