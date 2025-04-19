import MapControlPanelLayout from "@/layouts/MapControlPanelLayout";
import React from "react";
import MainControlPanelItems from "./MainControlPanelItems";

type Props = {
  tracking: boolean;
  handleLocateUser: () => void;
  isClickMapActivce: boolean;
  toggleManualLocation: () => void;
  toggleLegend: () => void;
  isShowLegend: boolean;
};

const MainControlPanel = ({
  tracking,
  handleLocateUser,
  isClickMapActivce,
  toggleManualLocation,
  toggleLegend,
  isShowLegend,
}: Props) => {
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
    </MapControlPanelLayout>
  );
};

export default MainControlPanel;
