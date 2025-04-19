import React from "react";
import {
  FaLayerGroup,
  FaLocationArrow,
  FaPersonWalkingLuggage,
  FaSquarePollHorizontal,
} from "react-icons/fa6";

import ButtonMapNavigation from "../common/ButtonTooltip";
import { MapSettingDropdown } from "./MapSettingDropdown";
import { AdvancedControlPanelProps } from "@/type/props";
import { ToggleType } from "@/type/common/ToggleType"; 
import { useTools } from "@/hooks/useTools";
type Props = AdvancedControlPanelProps &ToggleType;

const AdvancedControlPanelItems = ({
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
  const {open} = useTools()
  return (
    <>
      <ButtonMapNavigation
        onClick={launchAllAirplanes}
        Icon={FaPersonWalkingLuggage}
        label="how to react Koto Gadang"
        active={showAirPlane}
      />

      <ButtonMapNavigation
        onClick={handleGoToVillage}
        Icon={FaLocationArrow}
        label="Zoom to Koto Gadang"
      />

      <MapSettingDropdown
        Icon={FaLayerGroup}
        label="layer"
        data={layers}
        leftButtonOnClick={handleShowAllLayers}
        onDropDownItemClick={setLayers}
      />

      <MapSettingDropdown
        label="object"
        data={objects}
        leftButtonOnClick={handleShowAllObject}
        onDropDownItemClick={setObjects}
      />

      <ButtonMapNavigation
        onClick={togglePackage}
        Icon={FaSquarePollHorizontal}
        label={`${open?'close':'open'} package`}
      />
    </>
  );
};

export default AdvancedControlPanelItems;
