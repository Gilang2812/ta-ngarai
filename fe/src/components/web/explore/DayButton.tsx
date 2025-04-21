import Button from "@/components/common/Button";
import ButtonTooltip from "@/components/common/ButtonTooltip";
import { useDirectionStore } from "@/stores/DirectionStore";
import { DetailPackageSchema, PackageDay } from "@/type/schema/PackageSchema";
import { getCentroid } from "@/utils/common/getCentroid";
import { Dispatch, SetStateAction } from "react";
import { Dropdown } from "flowbite-react";
import { FaCaretDown, FaRoad } from "react-icons/fa";

type Props = {
  packageDays: (PackageDay & {
    detailPackages: DetailPackageSchema[];
  })[];
  buttonActive: string | null;
  setButtonActive: Dispatch<SetStateAction<string | null>>;
};
export const DayButton = ({
  packageDays,
  buttonActive,
  setButtonActive,
}: Props) => {
  const { direction, setOption, clearWayPoints, clearDirection, setwayPoints } =
    useDirectionStore();

  const handleAllDirection = (
    key: string,
    activities: DetailPackageSchema[]
  ) => {
    const wayPoint = activities.map((ac) => getCentroid(ac.object.geom));
    console.log(wayPoint);
    clearDirection();
    if (key === buttonActive) {
      setButtonActive(null);
    } else {
      setButtonActive(key);
    }
    setwayPoints(wayPoint);
  };

  return packageDays.map((day, index) => (
    <div key={index} className="flex   text-sm font-normal  ">
      <Button
        className="rounded-r-none px-2 "
        text={`day ${day.day}`}
        onClick={() =>
          handleAllDirection(`${day.day}${day.package_id}`, day.detailPackages)
        }
        active={!!direction && buttonActive === `${day.day}${day.package_id}`}
      />
      <Dropdown
        className="px-4 py-2"
        aria-expanded={true}
        label={day.day}
        dismissOnClick={false}
        renderTrigger={() => (
          <ButtonTooltip
            className="rounded-l-none"
            label="activities"
            Icon={FaCaretDown}
            active={
              !!direction &&
              buttonActive?.startsWith(`${day.day}${day.package_id}`)
            }
          />
        )}
      >
        <Button variant={"primary"}>
          <FaRoad /> Titik 0 ke 1
        </Button>

        {day.detailPackages?.map((ac, index) => {
          const next = day.detailPackages[index + 1];
          if (!next) return;
          return (
            <Button
              key={index}
              onClick={() => {
                clearWayPoints();
                setOption(
                  getCentroid(ac.object.geom),
                  getCentroid(next.object.geom)
                );
                setButtonActive(`${ac.day}${ac.package_id}${ac.activity}`);
              }}
              active={
                !!direction &&
                buttonActive === `${ac.day}${ac.package_id}${ac.activity}`
              }
              variant={"primary"}
            >
              <FaRoad /> activity {ac.activity} ke {parseInt(ac.activity) + 1}
            </Button>
          );
        })}
      </Dropdown>
    </div>
  ));
};
