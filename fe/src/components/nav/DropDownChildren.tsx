"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

type NavProps = {
  icon: IconType;
  label: string;
  link: string;
  onClick?: () => void; 
};
export const DropDownChildrenItem = ({ icon: Icon, label, link ,onClick}: NavProps) => {
  const pathName = usePathname();
  const isActive = link == pathName;
  return (
    <Link
      href={link}
      onClick={onClick}
      className={`flex items-center gap-4 p-3 px-2 pl-4  rounded-lg capitalize transition-ease-in-out ${
        isActive ? " text-primary" : "hover:text-primary"
      } hover:translate-x-1 `}
    >
      <Icon /> {label}
    </Link>
  );
};
