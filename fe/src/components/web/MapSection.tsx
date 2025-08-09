import MapWeb from "./MapWeb";

export default function MapSection({
  withPackage = true,
}: {
  withPackage?: boolean;
}) {
  return (
    <div className="flex overflow-x-hidden flex-col bg-white rounded-xl p-5 h-full basis-auto">
      <h4>Google Maps With location</h4>
      <MapWeb withPackage={withPackage} />
    </div>
  );
}
