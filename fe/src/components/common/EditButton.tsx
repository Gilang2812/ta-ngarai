import { FaPencil } from "react-icons/fa6"; 
import ButtonTooltip from "./ButtonTooltip";

export const EditButton = ({ ...props }: React.ComponentProps<"button">) => {
  return (
    <ButtonTooltip label="edit" variant={"regEdit"} {...props}>
      <FaPencil />
    </ButtonTooltip>
  );
};
