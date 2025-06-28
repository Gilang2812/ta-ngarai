import React, { useEffect } from "react";
import MapWeb from "../web/MapWeb";
import { useMapCraft } from "@/hooks/useMapCraft";
import SouvenirGeoJSON from "./SouvenirGeoJSON";
import { ContentDiffSplitted } from "../common/ContentDiffSplitted";
import CraftGrid from "./CraftGrid";

const MapCraft = () => {
  const { data } = useMapCraft();

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  const MapCraftRightGrid = () => {
    return (
      <div className="w-full relative max-h-screen overflow-y-auto">
        <CraftGrid />
      </div>
    );
  };
  return (
    data && (
      <ContentDiffSplitted
        left={
          <MapWeb zoom={17}>
            <SouvenirGeoJSON data={data} />
          </MapWeb>
        }
        right={<MapCraftRightGrid />}
      />
    )
  );
};

export default MapCraft;
