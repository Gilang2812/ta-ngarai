"use client";

import MapLayout from "./MapLayout";
import { DirectionsRenderer } from "@react-google-maps/api";
import { GeoJsonLayer } from "../map/GeoJSONLayer";
import { useUserNavigation } from "@/hooks/useUserNavigation";
import { useSetManualLocation } from "@/hooks/useManualLocation";
import { MarkerManualLocation } from "../map/MarkerManualLocation";
import { MapLegend } from "../map/MapLegend";
import { useShowLegend } from "@/hooks/useShowLegend";
import MapSkeletonLoader from "../loading/MapSkeleton";
import { labeledRegionLocations } from "@/data/labeledRegionLocation";
import { useCheckBox } from "@/hooks/useToggleCheckBox";
import { useToggleMapOptions } from "@/hooks/useToggleMapOptions";
import MapToolbar from "../map/MapToolbar";
import MapControlPanel from "../map/MapControlPanel";
import { RegionLabel } from "../map/RegionLabels";
import { MapMarker } from "../map/MapMarker";
import { AirplaneOverlays } from "../map/AirplaneOverLays";
import { useMapLayer } from "@/hooks/useMapLayers";
import { useAirPlaneController } from "@/hooks/useAirPlaneController";
import { useMapTools } from "@/hooks/useMapTools";
import { layersData } from "@/data/layers";
import { objectsData } from "@/data/object";

export default function MapWeb() {
  const {
    directions,
    handleLocateUser,
    locationError,
    tracking,
    userLocation,
  } = useUserNavigation();
  const { isTerrain, setIsTerrain, setShowLabel, showLabel } = useMapTools();
  const {
    clickedPosition,
    handleManualLocation,
    isClickMapActivce,
    toggleManualLocation,
  } = useSetManualLocation();

  const {
    mapRef,
    handleGoToVillage,
    airplanes,
    launchAllAirplanes,
    showAirPlane,
  } = useAirPlaneController();
  const { isShowLegend, toggleLegend } = useShowLegend();

  const {
    state: layers,
    setState: setLayers,
    toggleAllOptions: handleShowAllLayers,
  } = useToggleMapOptions(layersData);
  const {
    state: objects,
    setState: setObjects,
    toggleAllOptions: handleShowAllObject,
  } = useToggleMapOptions(objectsData);
  const { toggleCheckBox } = useCheckBox();
  const { isLoading, mergedRegions } = useMapLayer(layers);

  if (isLoading) return <MapSkeletonLoader />;
  return (
    <>
      <MapToolbar
        setIsTerrain={setIsTerrain}
        setShowLabel={setShowLabel}
        showLabel={showLabel}
        toggleCheckBox={toggleCheckBox}
      />
      <MapControlPanel
        tracking={tracking}
        handleLocateUser={handleLocateUser}
        isClickMapActivce={isClickMapActivce}
        toggleManualLocation={toggleManualLocation}
        toggleLegend={toggleLegend}
        isShowLegend={isShowLegend}
        launchAllAirplanes={launchAllAirplanes}
        showAirPlane={showAirPlane}
        handleGoToVillage={handleGoToVillage}
        layers={layers}
        setLayers={setLayers}
        handleShowAllLayers={handleShowAllLayers}
        objects={objects}
        setObjects={setObjects}
        handleShowAllObject={handleShowAllObject}
      />

      <div className="relative">
        <MapLegend isOpen={isShowLegend} />
        <MapLayout
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onClick={handleManualLocation}
          mapTypeId={`${isTerrain ? "terrain" : "satellite"}`}
        >
          {mergedRegions && <GeoJsonLayer data={mergedRegions} />}
          {userLocation && <MapMarker position={userLocation} />}
          <RegionLabel regions={labeledRegionLocations} showLabel={showLabel} />
          <AirplaneOverlays airplanes={airplanes} showAirPlane={showAirPlane} />
          <MarkerManualLocation position={clickedPosition} />
          {directions && <DirectionsRenderer directions={directions} />}
        </MapLayout>
      </div>
      {locationError && <p className="text-red-500 text-sm">{locationError}</p>}
    </>
  );
}
