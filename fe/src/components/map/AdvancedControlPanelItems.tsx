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
import { TbMapCancel } from "react-icons/tb";
import { useDirectionStore } from "@/stores/DirectionStore";
type Props = AdvancedControlPanelProps & ToggleType;

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
  togglePackage,
}: Props) => {
  const { open } = useTools();
  const { direction, clearDirection, objects:PackageObject, clearObject } =
    useDirectionStore();
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
        label={`${open ? "close" : "open"} package`}
        active={open}
      />
      {!open && (direction||PackageObject.length>0) && (
        <ButtonMapNavigation
          label="Close Direction"
          variant={"regDanger"}
          Icon={TbMapCancel}
          onClick={() => {
            clearDirection();
            clearObject();
          }}
        />
      )}
    </>
  );
};

export default AdvancedControlPanelItems;
