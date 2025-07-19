import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import CraftTransaction from "@/components/managereservation/CraftTransaction";

export default function managereservation() {
  return (
    <SingleContentWrapper>
      <header className="mb-8 text-center">
        <h3>Manage Reservations</h3>
      </header>
      <CraftTransaction />
    </SingleContentWrapper>
  );
}
