import { ActionButtonProps } from "@/type/props/ActionButtonProps";
import { FaTrash } from "react-icons/fa";

export const DeleteButton = ({ onClick }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-3 text-red-600 transition-ease-in-out bg-white border border-red-600 rounded hover:bg-red-600 hover:text-white"
      aria-label="Delete Announcement"
    >
      <FaTrash />
    </button>
  );
};
