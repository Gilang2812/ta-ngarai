import { LayerType } from "@/data/layers";
import { ObjectDataType } from "@/data/object";
import { Dispatch, SetStateAction } from "react";

export type AdvancedControlPanelProps = {
  launchAllAirplanes: () => void;
  showAirPlane: boolean;
  handleGoToVillage: () => void;
  layers: LayerType;
  setLayers: Dispatch<SetStateAction<LayerType>>;
  handleShowAllLayers: () => void;
  objects:ObjectDataType;
  setObjects: Dispatch<SetStateAction<ObjectDataType>>;
  handleShowAllObject: () => void;
  isAllCheckedLayers: boolean;
  isAllCheckedObjects: boolean;
  withPackage?: boolean;
};
