import { ActionButtonProps } from "@/type/props/ActionButtonProps";
import { FaPencil } from "react-icons/fa6";

export const EditButton = ({onClick}:ActionButtonProps) => {
  return (
    <button
    onClick={onClick}
      className="p-3 transition-ease-in-out bg-white border rounded border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white"
      aria-label="Edit Announcement"
    >
      <FaPencil />
    </button>
  );
};
