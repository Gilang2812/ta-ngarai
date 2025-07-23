import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import CraftTransaction from "@/components/managereservation/CraftTransaction";
import React from "react";

const ManageCraftTransaction = () => {
  return (
    <SingleContentWrapper>
      <header className="mb-8 text-center">
        <h3>Manage Reservations</h3>
      </header>
      <CraftTransaction />
    </SingleContentWrapper>
  );
};

export default ManageCraftTransaction;
