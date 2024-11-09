import { ActionButtonProps } from "@/type/props/ActionButtonProps";
import { FaCircleInfo } from "react-icons/fa6";

export const InfoButton = ({ onClick }: ActionButtonProps) => {
  return (
    <button onClick={onClick}
      className="p-3 transition-ease-in-out bg-white border rounded border-primary text-primary hover:bg-primary hover:text-white"
      aria-label="View Details"
    >
      <FaCircleInfo />
    </button>
  );
};
