'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

type NavProps = {
  icon: IconType;
  label: string;
  link: string; 
};

export const SideNavItem = ({ icon: Icon, label, link }: NavProps) => {
  const pathName = usePathname();
  const splittedPathName = pathName.split('/')

  const isActive =splittedPathName.length<=2?link==pathName:link.startsWith(splittedPathName.slice(0,3).join('/'));

  return (
    <Link
      href={link}
      className={`flex items-center gap-4 p-3 px-2 pl-4 rounded-lg capitalize transition ease-in-out ${
        isActive ? "text-white bg-primary" : "hover:bg-slate-500/10"
      }`}
    >
      <Icon /> {label}   
    </Link>
  );
};
