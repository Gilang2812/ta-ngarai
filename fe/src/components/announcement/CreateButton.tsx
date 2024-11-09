import { ActionButtonProps } from "@/type/props/ActionButtonProps";
import { FaPlus } from "react-icons/fa6";

export default function CreateButton({ onClick }: ActionButtonProps) {
  return (
    <button type="button" onClick={onClick} className="btn-fill-primary ">
      <FaPlus /> New Announcement
    </button>
  );
}
