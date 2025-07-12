 "use client";
import { useState } from "react";
import { ViewToggleButtons } from "@/components/craft/ViewToggleButtons";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import MapCraft from "@/components/craft/MapCraft";
import CraftGrid from "@/components/craft/CraftGrid";

export type ViewMode = "grid" | "map";

const CraftPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("map");

  return (
    <SingleContentWrapper>
      <ViewToggleButtons
        views={["map", "grid"]}
        current={viewMode}
        onChange={setViewMode}
      />

      <div className="container min-w-[400px]  mx-auto px-4 py-8">
        <div>
          {viewMode === "grid" ? (
            <>
              <CraftGrid />
            </>
          ) : (
            <MapCraft />
          )}
        </div>
      </div>
    </SingleContentWrapper>
  );
};

export default CraftPage;
