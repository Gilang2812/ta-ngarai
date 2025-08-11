"use client";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { ViewToggleButtons } from "@/components/craft/ViewToggleButtons";
import CraftTransaction from "@/components/managereservation/CraftTransaction";
import ManagePackageReservation from "@/components/managereservation/ManagePackageReservation";
import { useState } from "react";

export default function Managereservation() {
  const [view, setView] = useState<"package" | "craft">("package");
  return (
    <SingleContentWrapper>
      <ViewToggleButtons
        current={view}
        onChange={setView}
        views={["package", "craft"]}
      />
      <header className="mb-8 text-center">
        <h3>{`${
          view === "craft" ? "Manage Craft Transaction" : "Manage Reservation"
        }`}</h3>
      </header>
      {view === "craft" ? <CraftTransaction /> : <ManagePackageReservation />}
    </SingleContentWrapper>
  );
}
