"use client";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { IconType } from "react-icons";

type NavProps = {
  icon:
    | IconType
    | ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
  label: string;
  link: string;
  isActive?: boolean;
};

export const SideNavItem = ({
  icon: Icon,
  label,
  link,
isActive,
}: NavProps) => {
  const pathName = usePathname();
  const splittedPathName = pathName.split("/");

  const defaultIsActive =
    splittedPathName.length <= 2
      ? link == pathName
      : link.startsWith(splittedPathName.slice(0, 3).join("/"));

  if (isActive === undefined) {
    isActive = defaultIsActive;
  }
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
