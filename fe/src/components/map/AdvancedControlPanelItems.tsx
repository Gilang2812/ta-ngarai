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
import { TbMapCancel } from "react-icons/tb";
import { useDirectionStore } from "@/stores/DirectionStore";
import { useWebRightSection } from "@/hooks/useWebRightSection";
import { useTools } from "@/hooks/useTools";
import { useUserPositionStore } from "@/stores/UserPositionStore";
import Swal from "sweetalert2";
type Props = AdvancedControlPanelProps;

const AdvancedControlPanelItems = ({
  handleGoToVillage,
  handleShowAllLayers,
  handleShowAllObject,
  launchAllAirplanes,
  layers,
  objects,
  setLayers,
  setObjects,
  isAllCheckedLayers,
  isAllCheckedObjects,
  withPackage = true,
  showAirPlane,
  handleLocateUser,
  isClickMapActivce,
  toggleManualLocation,
  tracking,
}: Props) => {
  const { packageOpen, togglePackage, setObjectId } = useWebRightSection();
  const {
    direction,
    clearDirection,
    objects: PackageObject,
    clearObject,
  } = useDirectionStore();
  const { toggleOpen } = useTools();
  const { setRadius, userPosition, setUserPosition } = useUserPositionStore();
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
        active={isAllCheckedLayers}
        leftButtonOnClick={handleShowAllLayers}
        onDropDownItemClick={setLayers}
      />

      <MapSettingDropdown
        label="object"
        data={objects}
        active={isAllCheckedObjects}
        leftButtonOnClick={() => {
          handleShowAllObject();
          setRadius(null);
          toggleOpen("default");
        }}
        onDropDownItemClick={setObjects}
      />

      {withPackage && (
        <ButtonMapNavigation
          onClick={() => {
            togglePackage();
            setObjectId(null);
          }}
          Icon={FaSquarePollHorizontal}
          label={`${packageOpen ? "close" : "open"} package`}
          active={packageOpen}
        />
      )}
      {!packageOpen && (direction || PackageObject.length > 0) && (
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
      {userPosition && (
        <ButtonMapNavigation
          label="Remove User Marker"
          variant={"regDanger"}
          Icon={TbMapCancel}
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "Your location marker will be removed!",
              icon: "question",
            }).then((result) => {
              if (result.isConfirmed) {
                setUserPosition(null);
                if (isClickMapActivce) {
                  toggleManualLocation();
                }
                if (tracking) {
                  handleLocateUser();
                }
              }
            });
          }}
        />
      )}
    </>
  );
};

export default AdvancedControlPanelItems;
