import MapControlPanelLayout from "@/layouts/MapControlPanelLayout";
import { AdvancedControlPanelProps } from "@/types/props";
import React from "react";
import AdvancedControlPanelItems from "./AdvancedControlPanelItems";

type Props = AdvancedControlPanelProps;

const AdvancedControlPanel = ({
  handleGoToVillage,
  handleShowAllLayers,
  handleShowAllObject,
  launchAllAirplanes,
  layers,
  objects,
  setLayers,
  setObjects,
  showAirPlane,
  isAllCheckedLayers,
  isAllCheckedObjects,
  withPackage,
  handleLocateUser,
  isClickMapActivce,
  toggleManualLocation,
  tracking,
}: Props) => {
  return (
    <MapControlPanelLayout>
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
        isAllCheckedLayers={isAllCheckedLayers}
        isAllCheckedObjects={isAllCheckedObjects}
        withPackage={withPackage}
        handleLocateUser={handleLocateUser}
        isClickMapActivce={isClickMapActivce}
        toggleManualLocation={toggleManualLocation}
        tracking={tracking}
      />
    </MapControlPanelLayout>
  );
};

export default AdvancedControlPanel;
