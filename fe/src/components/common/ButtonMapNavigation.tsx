import React, { memo } from "react";
import { IconType } from "react-icons";
import { cn } from "@/utils/common/cn";
import { Tooltip } from "flowbite-react";

type Props = { Icon?: IconType; label: string,active?:boolean, text?:string } & React.ComponentProps<"button">;
const ButtonMapNavigationComponent = ({ Icon, label, className,active,text, ...props }: Props) => {
  return (
    <Tooltip content={label}>
      <button
        type="button"
        className={cn(
          "transition flex items-center font-normal justify-center p-2 h-full bg-primary rounded hover:bg-secondary transition-ease-in-out  text-white ",
          className,active&& "bg-green-400 ring-green-300 ring-4 hover:bg-green-600"
        )}
        {...props}
      >
        {!Icon?text:<Icon />} 
      </button>
    </Tooltip>
  );
};
ButtonMapNavigationComponent.displayName = "ButtonMapNavigation"
const ButtonMapNavigation = memo(ButtonMapNavigationComponent)
export default ButtonMapNavigation;
