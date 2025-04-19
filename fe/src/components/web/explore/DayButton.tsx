import Button from "@/components/common/Button";
import ButtonTooltip from "@/components/common/ButtonTooltip";
import { DetailPackageSchema } from "@/type/schema/PackageSchema";
import { Dropdown } from "flowbite-react";
import { FaCaretDown, FaRoad } from "react-icons/fa";

type Props = {
  day: string;
  activity: DetailPackageSchema[];
};
export const DayButton = ({ day, activity }: Props) => {
  return (
    <div className="flex   text-sm font-normal  ">
      <Button
        className="rounded-r-none px-2 "
        text={`day ${day}`}
        type="button"
      />
      <Dropdown
        className="px-4 py-2"
        aria-expanded={true}
        label={day}
        dismissOnClick={false}
        renderTrigger={() => (
          <ButtonTooltip
            className="rounded-l-none"
            label="activities"
            Icon={FaCaretDown}
          />
        )}
      >
        <Dropdown.Item className="flex items-center text-primary border border-primary rounded w-fit gap-2">
          <FaRoad /> Titik 0 ke 1
        </Dropdown.Item>

        {activity?.map((ac, index) => (
          <Dropdown.Item
            key={index}
            className="flex items-center text-primary border border-primary rounded w-fit gap-2"
          >
            <FaRoad /> activity {ac.activity} ke {parseInt(ac.activity) + 1}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};
