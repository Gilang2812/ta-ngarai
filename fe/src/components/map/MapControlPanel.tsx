"use client";

import MapControlPanelLayout from "@/layouts/MapControlPanelLayout";
import MainControlPanelItems from "./MainControlPanelItems";
import AdvancedControlPanelItems from "./AdvancedControlPanelItems";
import { AdvancedControlPanelProps, MainControlPanelProps } from "@/type/props"; 
type Props = MainControlPanelProps & AdvancedControlPanelProps  
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
  layers,
  setLayers,
  handleShowAllLayers,
  objects,
  setObjects,
  handleShowAllObject, 
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
        setLayers={setLayers}
        setObjects={setObjects}
        showAirPlane={showAirPlane} 
      />
    </MapControlPanelLayout>
  );
}
