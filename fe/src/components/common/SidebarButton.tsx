
import { useSidebarStore } from "@/stores/SidebarStore";
import { CgFormatJustify } from "react-icons/cg";

 
export const OpenSidebar = () => {
  const { toggleSidebar } = useSidebarStore();
  return (
    <button onClick={toggleSidebar} className="p-2   overflow-clip xl:w-0 w-fit text-3xl xl:  opacity-100 xl:opacity-0 transition-ease-in-out text-primary rounded">
      <CgFormatJustify  />
    </button>
  );
};
