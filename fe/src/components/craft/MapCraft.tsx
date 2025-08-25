import React from "react";
import MapWeb from "../web/MapWeb";
import { useMapCraft } from "@/hooks/useMapCraft";
import SouvenirGeoJSON from "./SouvenirGeoJSON";
import { ContentDiffSplitted } from "../common/ContentDiffSplitted";
import TourismInfo from "../web/TourismInfo";
import TourismPackage from "../web/TourismPackage";
import { Around } from "../web/explore/Around";
import { useTools } from "@/hooks/useTools";
import CraftRightSection from "./CraftRightSection";
import MapSkeletonLoader from "../loading/MapSkeleton";

const MapCraft = () => {
  const { data, selectedStore, handleSelectStore, isLoading } = useMapCraft();
  const { packageOpen, aroundOpen, toggleAround, marketplaceOpen } = useTools();

  const MapCraftRightGrid = () => {
    return (
      <div className="w-full relative max-h-screen overflow-y-auto">
        {packageOpen ? (
          <TourismPackage />
        ) : aroundOpen ? (
          <Around handleCloseAround={toggleAround} isAroundOpen={aroundOpen} />
        ) : marketplaceOpen ? (
          selectedStore && <CraftRightSection selectedStore={selectedStore} />
        ) : (
          <TourismInfo />
        )}
      </div>
    );
  };

  if (isLoading || !data) return <MapSkeletonLoader />;

  return (
    <ContentDiffSplitted
      left={
        <MapWeb zoom={17}>
          {!aroundOpen && (
            <SouvenirGeoJSON
              handleSelectStore={handleSelectStore}
              data={data}
            />
          )}
        </MapWeb>
      }
      right={<MapCraftRightGrid />}
    />
  );
};

export default MapCraft;
