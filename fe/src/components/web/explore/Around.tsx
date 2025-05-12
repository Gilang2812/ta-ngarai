// components/around/Around.tsx
import { ButtonSearchArround } from "@/components/common/ButtonSearchArround";
import { CheckBoxLabel } from "@/components/common/CheckBoxLabel";
import { ObjectDataType } from "@/data/object";
import { useMpaNearbyFilter } from "@/hooks/arround/useMapNearbyFilter";
import { fadeMotion } from "@/utils/common/motionVariants";
import { motion } from "framer-motion";

type AroundProps = {
  handleCloseAround: () => void;
  isAroundOpen: boolean;
};

export const Around = ({ handleCloseAround, isAroundOpen }: AroundProps) => {
  const {
    object,
    inputValue,
    radius,
    userPosition,
    handleRangeChange,
    handleSearchClick,
    handleCheckboxChange,
  } = useMpaNearbyFilter(handleCloseAround);

  return (
    <motion.div {...fadeMotion}>
      <h2 className="text-xl font-semibold text-center mb-4">Object Around</h2>

      <div className="grid grid-cols-2 gap-2">
        {Object.entries(object).map(([key, checked], index) => (
          <CheckBoxLabel
            key={index}
            id={`${key}${index}`}
            label={key}
            checked={checked}
            onChange={(e) =>
              handleCheckboxChange(
                key as keyof ObjectDataType,
                e.target.checked
              )
            }
          />
        ))}
      </div>

      <div className="my-4">
        <label htmlFor="range" className="block text-sm">
          Radius: {radius || 0} m
        </label>
        <input
          id="range"
          type="range"
          min="0"
          max="2000"
          value={inputValue}
          onChange={handleRangeChange}
          disabled={!userPosition}
        />
        {!userPosition && (
          <p className="text-red-500 text-xs">
            *Please determine your position first
          </p>
        )}
      </div>

      <ButtonSearchArround onClick={handleSearchClick} search={isAroundOpen} />
    </motion.div>
  );
};
