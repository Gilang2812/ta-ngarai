import React from "react";
import { SideNavItem } from "./SideNavItem";
import { FaHouse } from "react-icons/fa6";
import { ROUTES } from "@/data/routes";
import { usePathname } from "next/navigation";

const AuthNav = () => {
  const pathName = usePathname();
  return (
    <nav className="mt-12 font-bold">
      <ul className="space-y-1">
        <li>
          <SideNavItem icon={FaHouse} label="Home" link={ROUTES.HOME} />
        </li>
        <li>
          <SideNavItem
            icon={FaHouse}
            label="Manage Profile"
            link={ROUTES.PROFILE}
            isActive={
              pathName === ROUTES.PROFILE || pathName === ROUTES.UPDATE_PROFILE
            }
          />
        </li>
        <li>
          <SideNavItem
            icon={FaHouse}
            label="Change Password"
            link={ROUTES.CHANGE_PASSWORD}
            isActive={pathName === ROUTES.CHANGE_PASSWORD}
          />
        </li>
      </ul>
    </nav>
  );
};

export default AuthNav;
