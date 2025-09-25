import { SingleContentWrapper } from "../common/SingleContentWrapper";
import MapWeb from "./MapWeb";

export default function MapSection({
  withPackage = true,
}: {
  withPackage?: boolean;
}) {
  return (
    <SingleContentWrapper className="flex overflow-x-hidden flex-col  selection: rounded-xl p-5 h-full basis-auto">
      <h4>Google Maps With location</h4>
      <MapWeb withPackage={withPackage} />
    </SingleContentWrapper>
  );
}
