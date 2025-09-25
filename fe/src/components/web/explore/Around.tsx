// components/around/Around.tsx
import Button from "@/components/common/Button";
import { ButtonSearchArround } from "@/components/common/ButtonSearchArround";
import { CheckBoxLabel } from "@/components/common/CheckBoxLabel";
import { ObjectDataType } from "@/data/object";
import { useMpaNearbyFilter } from "@/hooks/arround/useMapNearbyFilter";
import useTravelRoute from "@/hooks/useTravelRoute"; 
import { fadeMotion } from "@/utils/common/motionVariants";
import { motion } from "framer-motion";
import { FaRoute, FaX } from "react-icons/fa6";

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

  const {
    routes,
    handleRemoveRoute,
    removeAllRoutes,
    handleReturnToUserLocation,
    handleCreateRoute,
  } = useTravelRoute();
  return (
    <motion.div {...fadeMotion}>
      {routes.length > 0 && (
        <section className="shadow p-5 space-y-4 rounded-xl mb-4 ">
          <h2 className="text-xl mb-4 text-secondary font-semibold">
            Your Travel Route
          </h2>
          {routes?.map((route, index) => (
            <article
              key={route.id}
              className="border rounded divide-x font-normal"
            >
              <section className="flex items-center justify-between gap-4 p-2 px-4 capitalize">
                <p>{`${index + 1}. ${route.name}`}</p>
                <Button
                  variant={"danger"}
                  type="button"
                  onClick={() => handleRemoveRoute(index)}
                >
                  <FaX />
                </Button>
              </section>
            </article>
          ))}
          <article className="flex items-center  gap-4 p-2 px-4">
            <Button
              onClick={handleReturnToUserLocation}
              type="button"
              variant={"edit"}
            >
              Return to To Your Location
            </Button>
            <Button
              className="border"
              onClick={() => {
                removeAllRoutes();
              }}
              type="button"
              variant="regDanger"
            >
              Done & Close
            </Button>
          </article>
        </section>
      )}

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
      <footer className="flex items-center gap-2">
        <ButtonSearchArround
          onClick={handleSearchClick}
          search={isAroundOpen}
        />
        {routes.length === 0 && (
          <Button variant={"success"} onClick={handleCreateRoute} type="button">
            <FaRoute /> Create Travel Route
          </Button>
        )}
      </footer>
    </motion.div>
  );
};
