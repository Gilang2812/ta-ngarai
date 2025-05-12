 
import MapWeb from "./MapWeb";

export default function MapSection() {
  return (
    <>
      <div className="flex overflow-scroll flex-col bg-white rounded-xl p-5 h-full basis-auto">
        <h4>Google Maps With location</h4>
        <MapWeb  />
      </div>
    </>
  );
}
