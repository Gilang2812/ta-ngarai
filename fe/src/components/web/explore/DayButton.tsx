import Button from "@/components/common/Button";
import ButtonTooltip from "@/components/common/ButtonTooltip";
import { useDirectionStore } from "@/stores/DirectionStore";
import {
  AttractionSchema,
  CulinaryPlace,
  DetailPackageSchema,
  Facility,
  PackageDay,
  SimplifiedObject,
  SouvenirPlaceSchema,
  TraditionalHouse,
  WorshipPlaceSchema,
} from "@/type/schema/PackageSchema";
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
  const { setObject, direction,objects, setOption, clearObject, clearDirection } =
    useDirectionStore();

  const handleAllDirection = (
    key: string,
    activities: DetailPackageSchema[]
  ) => {
  
    clearDirection();
    clearObject();
    const object = activities.map((ac) => {
      if (ac.activity_type === "A") {
        const { geom, geom_area, name, type, price } =
          ac.object as AttractionSchema;
        return { geom, geom_area, name, type, price };
      } else if (ac.activity_type === "CP") {
        const { geom, geom_area, name, contact_person, address } =
          ac.object as CulinaryPlace;
        return { geom, geom_area, name, contact_person, address };
      } else if (ac.activity_type === "FC") {
        const { geom, geom_area, name, price } = ac.object as Facility;
        return { geom, geom_area, name, price };
      } else if (ac.activity_type === "SP") {
        const { geom, geom_area, name, contact_person, address } =
          ac.object as SouvenirPlaceSchema;
        return { geom, geom_area, name, contact_person, address };
      } else if (ac.activity_type === "TH") {
        const { geom, geom_area, name, contact_person, address } =
          ac.object as TraditionalHouse;
        return { geom, geom_area, name, contact_person, address };
      } else if (ac.activity_type === "WO") {
        const { geom, geom_area, name, capacity, address } =
          ac.object as WorshipPlaceSchema;
        return { geom, geom_area, name, capacity, address };
      }
    });
    if (key === buttonActive) {
      clearDirection();
      clearObject();
      setButtonActive(null);
    } else {

      setTimeout(() => { 
        setObject(object as SimplifiedObject[]);
        setButtonActive(key);
      }, 5);
    }
  };

  return packageDays?.map((day, index) => (
    <div key={index} className="flex   text-sm font-normal  ">
      <Button
        className="rounded-r-none px-2 "
        text={`day ${day.day}`}
        onClick={() =>
          handleAllDirection(`${day.day}${day.package_id}`, day.detailPackages)
        }
        active={!!(objects.length>0) && buttonActive === `${day.day}${day.package_id}`}
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
              !!(direction||objects.length>0) &&
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
                clearObject();
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
