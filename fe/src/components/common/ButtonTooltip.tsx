import React from "react";
import { Tooltip } from "flowbite-react";
import { ButtonTooltipType } from "@/type/common/ButtonType";
import Button from "./Button";

type Props = ButtonTooltipType;

const ButtonTooltip = ({
  Icon,
  label,
  className,
  active,
  text,
  asChild,
  variant,
  ...props
}: Props) => {
  return (
    <Tooltip content={label}>
      <Button
        asChild={asChild}
        Icon={Icon}
        className={className}
        active={active}
        text={text}
        variant={variant}
        {...props}
      />
    </Tooltip>
  );
};

export default ButtonTooltip;
