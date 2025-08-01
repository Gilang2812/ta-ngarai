"use client";

import MapLayout from "./MapLayout";
import MapSkeletonLoader from "../loading/MapSkeleton";
import { labeledRegionLocations, layersData, objectsData } from "@/data";
import {
  AirplaneOverlays,
  GeoJsonLayer,
  MapControlPanel,
  MapLegend,
  MapMarker,
  MapToolbar,
  MarkerManualLocation,
  RegionLabel,
} from "../map";
import {
  useAirPlaneController,
  useCheckBox,
  useMapLayer,
  useMapTools,
  useSetManualLocation,
  useShowLegend,
  useToggleMapOptions,
  useUserNavigation,
} from "@/hooks";
import { useGoToLocation } from "@/hooks/useGoToVillage";
import { memo, useEffect, useRef } from "react";
import { layerType } from "@/data/layers";
import { useObjectArround } from "@/hooks/useMergeObjectLayer";
import ObjectGeoJSON from "../map/ObjectGeoJSON";
import { useMergeALlObject } from "@/hooks/useMergeAllObject";
import { GoogleMap } from "@react-google-maps/api";
import { useTools } from "@/hooks/useTools";
import CustomRoute from "../map/CustomRoute";
import useTravelRoute from "@/hooks/useTravelRoute";
import MapWeather from "../weather/MapWeather";

function MapWeb({
  zoom,
  children,
  souvenir = false,
}: { souvenir?: boolean } & React.ComponentProps<typeof GoogleMap>) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const { open } = useTools();
  const { isTerrain, setIsTerrain, setShowLabel, showLabel } = useMapTools();
  const { routes } = useTravelRoute();
  const {
    clickedPosition,
    handleManualLocation,
    isClickMapActivce,
    toggleManualLocation,
  } = useSetManualLocation();

  const { handleGoToVillage } = useGoToLocation(mapRef);

  const { airplanes, launchAllAirplanes, showAirPlane } =
    useAirPlaneController(mapRef);

  const { isShowLegend, toggleLegend } = useShowLegend();

  const { handleLocateUser, locationError, tracking, userLocation } =
    useUserNavigation(mapRef);

  const {
    state: layers,
    setState: setLayers,
    toggleAllOptions: handleShowAllLayers,
    unCheckAllOptions: hideAllLayers,
  } = useToggleMapOptions(layersData);

  const {
    state: objects,
    setState: setObjects,
    toggleAllOptions: handleShowAllObject,
    unCheckAllOptions: hideAllObjects,
  } = useToggleMapOptions(objectsData);

  const { objectGeom } = useObjectArround();
  const { allObjectGeom } = useMergeALlObject(objects);
  const { toggleCheckBox } = useCheckBox();

  useEffect(() => {
    if (open === "around") {
      hideAllObjects();
    }
  }, [open, hideAllObjects]);
  const { isLoading, mergedRegions } = useMapLayer(layers as layerType);

  useEffect(() => {
    if (souvenir) {
      setObjects((prev) => ({
        ...prev,
        souvenir,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [souvenir]);

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
        handleLocateUser={async () => {
          if (isClickMapActivce) {
            toggleManualLocation();
          }
          handleLocateUser();
        }}
        isClickMapActivce={isClickMapActivce}
        toggleManualLocation={() => {
          if (tracking) {
            handleLocateUser();
          }
          toggleManualLocation();
          hideAllLayers();
        }}
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
      <div>
        <MapWeather />
      </div>
      <div className="relative min-h-96 min-w-96 ">
        <MapLegend isOpen={isShowLegend} />
        <MapLayout
          onLoad={(map) => {
            mapRef.current = map;
          }}
          origin={userLocation || clickedPosition}
          onClick={handleManualLocation}
          mapTypeId={`${isTerrain ? "terrain" : "satellite"}`}
          zoom={zoom || 17}
          options={{
            mapTypeId: `${isTerrain ? "terrain" : "satellite"}`,
          }}
          hideAllLayer={hideAllLayers}
        >
          {mergedRegions && <GeoJsonLayer data={mergedRegions} />}

          {routes.length < 2 && userLocation && (
            <MapMarker position={userLocation} />
          )}
          <RegionLabel regions={labeledRegionLocations} showLabel={showLabel} />
          <AirplaneOverlays airplanes={airplanes} showAirPlane={showAirPlane} />
          {routes.length < 2 && (
            <MarkerManualLocation position={clickedPosition} />
          )}
          {objectGeom && <ObjectGeoJSON data={objectGeom} />}
          {allObjectGeom && <ObjectGeoJSON data={allObjectGeom} />}
          {children}

          <CustomRoute hideAllLayers={hideAllLayers} />
        </MapLayout>
      </div>
      {locationError && <p className="text-red-500 text-sm">{locationError}</p>}
    </>
  );
}
export default memo(MapWeb);
