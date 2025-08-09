import { type Button } from "@/type/common/ButtonType";
import { cn } from "@/utils/common/cn";
import React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { Spinner } from "flowbite-react";

export const buttonVariants = cva(
  "flex justify-center items-center transition active:bg-green-300 justify-center px-3 py-2 gap-2 h-full  rounded transition-ease-in-out font-normal",
  {
    variants: {
      variant: {
        default:
          "text-white bg-primary hover:bg-secondary disabled:bg-gray-300 disabled:text-white disabled:hover:bg-gray-300",
        primary:
          "bg-white disabled:border-primary/70 disabled:text-primary/70 text-primary disabled:hover:bg-white border border-primary disabled:hover:text-primary/70 hover:text-white hover:bg-primary",
        danger:
          "text-white   bg-red-600 disabled:hover:bg-red-600 w-fit hover:text-white hover:bg-red-700",
        regDanger:
          "text-red-600 disabled:text-red-300  border border-red-600 disabled:border-red-300 bg-red-600/10 disabled:hover:bg-red-600/10  hover:bg-red-600/70 hover:text-white ",
        success:
          "text-white  bg-green-600 disabled:hover:bg-green-600 w-fit hover:text-white hover:bg-green-800",
        regSuccess:
          "bg-white border border-green-600 disabled:hover:bg-white text-green-600 w-fit  hover:text-white hover:bg-green-900",
        secondary:
          "text-black disabled:text-white disabled:hover:bg-gray-300 bg-gray-300  w-fit hover:text-white hover:bg-gray-500 ",
        regSecondary:
          "text-gray-500 disabled:text-gray-500 border border-black  disabled:hover:bg-white bg-white  w-fit hover:text-white hover:bg-gray-400 hover:border-gray-500",
        regEdit:
          " bg-white disabled:hover:bg-white border   border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white",
        edit: " bg-cyan-400 disabled:hover:bg-cyan-200 border   border-cyan-400 text-white hover:bg-cyan-500 disabled:bg-cyan-200",
      },
      isActive: {
        default: "",
        active:
          "bg-green-400 border-white text-white ring-green-300 ring-4 hover:bg-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
      isActive: "default",
    },
  }
);
const Button = ({
  isLoading = false,
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
      {isLoading ? (
        <Spinner />
      ) : (
        props.children ?? (
          <>
            {Icon && <Icon />}
            {text}
          </>
        )
      )}
    </Comp>
  );
};

export default Button;
