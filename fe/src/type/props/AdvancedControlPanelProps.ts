import { layerType } from "@/data/layers";
import { ObjectDataType } from "@/data/object";
import { Dispatch, SetStateAction } from "react";

export type AdvancedControlPanelProps = {
  launchAllAirplanes: () => void;
  showAirPlane: boolean;
  handleGoToVillage: () => void;
  layers: Record<string, boolean>;
  setLayers: Dispatch<SetStateAction<layerType>>;
  handleShowAllLayers: () => void;
  objects: Record<string, boolean>;
  setObjects: Dispatch<SetStateAction<ObjectDataType>>;
  handleShowAllObject: () => void;
  isAllCheckedLayers: boolean;
  isAllCheckedObjects: boolean;
  withPackage?: boolean;
};
