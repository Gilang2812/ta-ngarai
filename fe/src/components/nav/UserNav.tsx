import { SideNavItem } from "@/components/nav/SideNavItem";
import { BsFillGridFill } from "react-icons/bs";
import {
  FaInstagram,
  FaList,
  FaMap, 
  FaTiktok,
} from "react-icons/fa";
import { FaCalendar, FaHouse, FaSquarePollHorizontal } from "react-icons/fa6";
import { DropDownItem } from "@/components/nav/DropDownItem";
import { DropDownChildrenItem } from "./DropDownChildren";

interface UserNavProps {
  handleNavigation: (url: string) => void;
}

export const UserNav = ({ handleNavigation }: UserNavProps) => {
  return (
    <nav className="mt-12 font-bold">
      <ul className="space-y-1">
        <li>
          <SideNavItem 
            icon={FaHouse} 
            label="Home" 
            link="/web" 
            onClick={() => handleNavigation("/web")} 
          />
        </li>
        <li>
          <DropDownItem icon={FaMap} label="Explore Village">
            <DropDownChildrenItem
              icon={FaList}
              label="With Our Package"
              link="/web/explore"
              onClick={() => handleNavigation("/web/explore")}
            />
            <DropDownChildrenItem
              icon={FaList}
              label="With My Village"
              link="/web/mypackage"
              onClick={() => handleNavigation("/web/mypackage")}
            />
          </DropDownItem>
        </li>
        <li>
          <SideNavItem
            icon={FaSquarePollHorizontal} 
            label="Tourism Package" 
            link="/web/package" 
            onClick={() => handleNavigation("/web/package")}
          />
        </li>
        <li>
          <SideNavItem
            icon={BsFillGridFill}
            label="Dashboard"
            link="/dashboard/managereservation"
            onClick={() => handleNavigation("/dashbord/managereservation")}
          />
        </li>
        <li>
          <SideNavItem
            icon={FaCalendar}
            label="my reservation"
            link="/web/reservation"
            onClick={() => handleNavigation("/web/reservation")}
          />
        </li>
        <li className="flex flex-wrap ">
          <SideNavItem icon={FaInstagram} label="Instagram" link="#" />
          <SideNavItem icon={FaTiktok} label="Tiktok" link="#" />
        </li>
      </ul>
    </nav>
  );
};
