import { FaPlus } from "react-icons/fa6";
import Button from "../common/Button";

export default function CreateButton({
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Button  {...props}>
      <FaPlus /> New Announcement
    </Button>
  );
}
