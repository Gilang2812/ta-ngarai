"use client";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { ViewToggleButtons } from "@/components/craft/ViewToggleButtons";
import CraftReservation from "@/components/reservation/CraftReservation";
import PackageReservation from "@/components/reservation/PackageReservation";

import { useState } from "react";

type ViewsProps = "package" | "craft";

const Reservation = () => {
  const [view, setView] = useState<ViewsProps>("craft");

  return (
    <SingleContentWrapper>
      <ViewToggleButtons
        current={view}
        onChange={setView}
        views={["craft", "package"]}
      />
      <header className="text-center capitalize mb-12">
        <h2>List{ view==='package'? ' Package Reservation' : ' Craft Reservation'}</h2>
      </header>
      {view === "package" ? (
        <PackageReservation />
      ) : (
        <CraftReservation />
      )}
    </SingleContentWrapper>
  );
};

export default Reservation;
