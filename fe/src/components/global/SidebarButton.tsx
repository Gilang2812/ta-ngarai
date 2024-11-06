import { useSidebar } from "@/context/SidebarContext"; 
import { CgFormatJustify } from "react-icons/cg";

 
export const OpenSidebar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <button onClick={toggleSidebar} className="p-2 text-3xl xl:hidden opacity-100 xl:opacity-0 transition-ease-in-out text-primary rounded">
      <CgFormatJustify  />
    </button>
  );
};
