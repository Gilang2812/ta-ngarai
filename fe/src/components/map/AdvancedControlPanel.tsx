import MapControlPanelLayout from "@/layouts/MapControlPanelLayout";
import { AdvancedControlPanelProps } from "@/type/props";
import React from "react";
import AdvancedControlPanelItems from "./AdvancedControlPanelItems"; 

type Props = AdvancedControlPanelProps 

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
      />
    </MapControlPanelLayout>
  );
};

export default AdvancedControlPanel;
