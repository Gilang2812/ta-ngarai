import React from "react";
import { IconType } from "react-icons";
import { cn } from "@/utils/common/cn";
import { Tooltip } from "flowbite-react";

type Props = { Icon: IconType; label: string } & React.ComponentProps<"button">;
const ButtonMapNavigation = ({ Icon, label, className, ...props }: Props) => {
  return (
    <Tooltip content={label}>
      <button
        type="button"
        className={cn(
          "flex items-center justify-center p-2 bg-primary rounded hover:bg-secondary transition-ease-in-out  text-white ",
          className
        )}
        {...props}
      >
        <Icon />
      </button>
    </Tooltip>
  );
};

export default ButtonMapNavigation;
