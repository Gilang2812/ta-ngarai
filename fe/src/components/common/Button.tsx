import { type Button } from "@/type/common/ButtonType";
import { cn } from "@/utils/common/cn";
import React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

export const buttonVariants = cva(
  "flex items-center transition justify-center px-3 py-2 gap-2 h-full  rounded transition-ease-in-out font-normal",
  {
    variants: {
      variant: {
        default: "text-white bg-primary hover:bg-secondary",
        primary:
          "bg-white text-primary border border-primary   hover:text-white hover:bg-secondary",
        danger:
          "text-white  bg-red-600 w-fit hover:text-white hover:bg-red-700",
        regDanger: "text-red-600 border border-red-600 border-2 bg-red-600/10  hover:bg-red-600/70 hover:text-white ",
        success:
          "text-white  bg-green-600 w-fit hover:text-white hover:bg-green-800",
        regSuccess:
          "bg-white border border-green-600  text-green-600 w-fit  hover:text-white hover:bg-green-900",
        secondary:
          "btn px-3 py-2 font-normal text-white  bg-gray-300 w-fit hover:text-white hover:bg-gray-400",
      },
      isActive: {
        default: "",
        active: "bg-green-400 ring-green-300 ring-4 hover:bg-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
      isActive: "default",
    },
  }
);
const Button = ({
  active,
  className,
  variant,
  Icon,
  text,
  asChild = false,
  ...props
}: Button) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        buttonVariants({
          variant: variant,
          className,
          isActive: active ? "active" : "default",
        })
      )}
      {...props}
    >
      {props.children ?? (
        <>
          {Icon && <Icon />}
          {text}
        </>
      )}
    </Comp>
  );
};

export default Button;
