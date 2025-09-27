import React from "react";
import { PiCrosshairLight } from "react-icons/pi";
import { cornerAlert } from "@/utils/AlertUtils";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ButtonMapNavigation from "../common/ButtonTooltip";

type Props = {
  tracking: boolean;
  handleLocateUser: () => void;
  isClickMapActivce: boolean;
  toggleManualLocation: () => void;
  toggleLegend: () => void;
  isShowLegend: boolean;
};

function MainControlPanelItems({
  tracking,
  handleLocateUser,
  isClickMapActivce,
  toggleManualLocation,
  toggleLegend,
  isShowLegend,
}: Props) {
  return (
    <>
      <ButtonMapNavigation
        label={tracking ? "cancel navigate" : "navigate from current"}
        onClick={handleLocateUser}
        Icon={PiCrosshairLight}
        active={!!tracking}
      />
      <ButtonMapNavigation
        onClick={() => {
          if (!isClickMapActivce) cornerAlert("click on the map");
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
    </>
  );
}

export default MainControlPanelItems;
