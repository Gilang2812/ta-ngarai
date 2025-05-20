 
import { FaCircleInfo } from "react-icons/fa6";
import ButtonTooltip from "./ButtonTooltip";

export const InfoButton = ({ ...props }: React.ComponentProps<"button">) => {
  return (
    <ButtonTooltip label="detail"  variant={"primary"} className="p-3" {...props}>
      <FaCircleInfo />
    </ButtonTooltip>
  );
};

