import { Dispatch, SetStateAction } from "react";

export type AdvancedControlPanelProps = {
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
