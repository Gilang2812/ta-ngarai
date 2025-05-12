import { buttonVariants } from "@/components/common/Button";
import { type VariantProps } from "class-variance-authority";
import { IconType } from "react-icons";

export type Button = {
  Icon?: IconType;
  active?: boolean;
  text?: string;
  asChild?: boolean;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export type ButtonTooltipType = Button & {
  label: string;
};
