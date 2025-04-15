"use client";  
import { IconType } from "react-icons";
import { BsChevronDown } from "react-icons/bs";
import { useDropdown } from "@/utils/DropDownUtils";

type NavProps = {
  icon: IconType;
  label: string;
  children?: React.ReactNode;
};

export const DropDownItem = ({ icon: Icon, label, children }: NavProps) => {
  
  const {open,toggleDropdown} = useDropdown() 
  return (
    <div>
      <button
        onClick={toggleDropdown}
        type="button"
        className={`flex items-center w-full justify-between p-3 px-2 pl-4 rounded-lg capitalize transition-ease-in-out hover:bg-slate-500/10`}
      >
        <span className="flex items-center gap-4">
          <Icon />
          {label}
        </span>
        <BsChevronDown className={`${open ? "-rotate-180" : "rotate-0"} transition-linear`} />
      </button>
      <div
        className={`px-4 ${
          open ? "max-h-96  " : "max-h-0  "
        } transition-linear-10 overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
};
