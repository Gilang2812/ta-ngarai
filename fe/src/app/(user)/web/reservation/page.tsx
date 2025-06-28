"use client";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { ViewToggleButtons } from "@/components/craft/ViewToggleButtons";
import CraftTransaction from "@/components/reservation/CraftTransaction";
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
      <header className="text-center capitalize my-6">
        <h2>List{ view==='package'? ' Package Reservation' : ' Craft Transaction'}</h2>
      </header>
      {view === "package" ? (
        <PackageReservation />
      ) : (
        <CraftTransaction />
      )}
    </SingleContentWrapper>
  );
};

export default Reservation;
