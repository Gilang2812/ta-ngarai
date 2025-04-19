import MapControlPanelLayout from "@/layouts/MapControlPanelLayout";
import { AdvancedControlPanelProps } from "@/type/props";
import React from "react";
import AdvancedControlPanelItems from "./AdvancedControlPanelItems";
import { ToggleType } from "@/type/common/ToggleType";

type Props = AdvancedControlPanelProps&ToggleType;

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
  togglePackage
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
        togglePackage={togglePackage}
      />
    </MapControlPanelLayout>
  );
};

export default AdvancedControlPanel;
