"use client";

import {
  FaLayerGroup,
  FaLocationArrow,
  FaLocationDot,
  FaPersonWalkingLuggage,
  FaSquarePollHorizontal,
} from "react-icons/fa6";
import { PiCrosshairLight } from "react-icons/pi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import ButtonMapNavigation from "../common/ButtonMapNavigation";
import { MapSettingDropdown } from "./MapSettingDropdown";
import { Dispatch, SetStateAction } from "react";

type Props = {
  tracking: boolean;
  handleLocateUser: () => void;
  isClickMapActivce: boolean;
  toggleManualLocation: () => void;
  toggleLegend: () => void;
  isShowLegend: boolean;
  launchAllAirplanes: () => void;
  showAirPlane: boolean;
  handleGoToVillage: () => void;
  layers: Record<string, boolean>;
  setLayers: Dispatch<SetStateAction<Record<string, boolean>>>;
  handleShowAllLayers: () => void;
  objects: Record<string, boolean>;
  setObjects: Dispatch<SetStateAction<Record<string, boolean>>>;
  handleShowAllObject: () => void;
};

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
    <div className="flex items-stretch gap-2 py-2">
      <ButtonMapNavigation
        label={tracking ? "cancel navigate" : "navigate from current"}
        onClick={handleLocateUser}
        Icon={PiCrosshairLight}
        active={tracking}
      />

      <ButtonMapNavigation
        onClick={() => {
          if (!isClickMapActivce) alert("click on the map");
          toggleManualLocation();
        }}
        Icon={FaLocationDot}
        label="Set Manual Location"
        active={isClickMapActivce}
      />

      <ButtonMapNavigation
        onClick={toggleLegend}
        Icon={MdOutlineRemoveRedEye}
        label="show legend"
        active={isShowLegend}
      />

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
        label="object"
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
        onClick={handleGoToVillage}
        Icon={FaSquarePollHorizontal}
        label="Tour Package"
      />
    </div>
  );
}
