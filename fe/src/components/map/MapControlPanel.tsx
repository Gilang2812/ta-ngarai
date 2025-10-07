"use client";

import MapControlPanelLayout from "@/layouts/MapControlPanelLayout";
import MainControlPanelItems from "./MainControlPanelItems";
import AdvancedControlPanelItems from "./AdvancedControlPanelItems";
import { AdvancedControlPanelProps, MainControlPanelProps } from "@/types/props";
type Props = MainControlPanelProps & AdvancedControlPanelProps;
export default function MapControlPanel({
  tracking,
  handleLocateUser,
  isClickMapActivce,
  toggleManualLocation,
  toggleLegend,
  isShowLegend,
  launchAllAirplanes,
  showAirPlane,
  handleGoToVillage,
  isAllCheckedLayers,
  isAllCheckedObjects,
  layers,
  setLayers,
  handleShowAllLayers,
  objects,
  setObjects,
  handleShowAllObject,
  withPackage = true,
}: Props) {
  return (
    <MapControlPanelLayout>
      <MainControlPanelItems
        handleLocateUser={handleLocateUser}
        isClickMapActivce={isClickMapActivce}
        isShowLegend={isShowLegend}
        toggleLegend={toggleLegend}
        toggleManualLocation={toggleManualLocation}
        tracking={tracking}
      />
      <AdvancedControlPanelItems
        handleGoToVillage={handleGoToVillage}
        handleShowAllLayers={handleShowAllLayers}
        handleShowAllObject={handleShowAllObject}
        launchAllAirplanes={launchAllAirplanes}
        layers={layers}
        objects={objects}
        isAllCheckedLayers={isAllCheckedLayers}
        isAllCheckedObjects={isAllCheckedObjects}
        setLayers={setLayers}
        setObjects={setObjects}
        showAirPlane={showAirPlane}
        withPackage={withPackage}
        handleLocateUser={handleLocateUser}
        isClickMapActivce={isClickMapActivce}
        toggleManualLocation={toggleManualLocation}
        tracking={tracking}
      />
    </MapControlPanelLayout>
  );
}
