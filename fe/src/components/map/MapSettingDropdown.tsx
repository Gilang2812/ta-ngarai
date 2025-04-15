import React, { Dispatch, SetStateAction } from "react";
import ButtonMapNavigation from "../common/ButtonMapNavigation";
import { Dropdown, DropdownItem } from "flowbite-react";
import { MdArrowDropDown } from "react-icons/md";
import { IconType } from "react-icons";
import { CheckBoxLabel } from "../common/CheckBoxLabel";

type Props<T> = { 
  Icon?: IconType;
  leftButtonOnClick: () => void;
  onDropDownItemClick: Dispatch<SetStateAction<T>>;
  data: Record<string, boolean>;
  label:string;
};

export const MapSettingDropdown = <T,>({
  Icon,
  leftButtonOnClick,
  data,
  label,
  onDropDownItemClick,
}: Props<T>) => {
  return (
    <div className="flex items-stretch">
      <ButtonMapNavigation
        onClick={leftButtonOnClick}
        Icon={Icon}
        className="rounded-r-none"
        label={`View All ${label}`}
        text={label}
      />
      <Dropdown
        dismissOnClick={false}
        renderTrigger={() => (
          <ButtonMapNavigation
            Icon={MdArrowDropDown}
            className="rounded-l-none h-full"
            label={`show ${label}`}
          />
        )}
      >
        {(Object.keys(data)).map((item, index) => (
          <DropdownItem key={index}>
            <CheckBoxLabel
              id={`item${index}`}
              label={item}
              onChange={(e) =>
                onDropDownItemClick((prev) => ({
                  ...prev,
                  [item]: e.target.checked,
                }))
              }
              checked={data[item]}
            />
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
};
