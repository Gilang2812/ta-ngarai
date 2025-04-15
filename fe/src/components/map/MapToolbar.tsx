// components/map/MapToolbar.tsx
import { CheckBoxLabel } from "../common/CheckBoxLabel";

type MapToolbarProps = {
  showLabel: boolean;
  setShowLabel:  React.Dispatch<React.SetStateAction<boolean>>
  setIsTerrain:  React.Dispatch<React.SetStateAction<boolean>>
  toggleCheckBox: (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function MapToolbar({
  showLabel,
  setShowLabel,
  setIsTerrain,
  toggleCheckBox,
}: MapToolbarProps) {
  return (
    <div className="flex gap-2 text-sm py-2">
      <CheckBoxLabel
        id="mapLabel"
        label="Label"
        onChange={toggleCheckBox(setShowLabel)}
        checked={showLabel}
      />
      <CheckBoxLabel
        id="terrain"
        label="Terrain"
        onChange={toggleCheckBox(setIsTerrain)}
      />
    </div>
  );
}
