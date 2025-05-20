import { FaTrash } from "react-icons/fa"; 
import ButtonTooltip from "./ButtonTooltip";

export const DeleteButton = ({ ...props }: React.ComponentProps<"button">) => {
  return (
    <ButtonTooltip label="delete" variant={"regDanger"} className="p-3" {...props}>
      <FaTrash />
    </ButtonTooltip>
  );
};
