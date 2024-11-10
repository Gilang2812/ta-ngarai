import { SideNavItem } from "@/components/nav/SideNavItem";
import { BsFillGridFill } from "react-icons/bs";
import {
  FaInstagram,
  FaList,
  FaMap, 
  FaTiktok,
} from "react-icons/fa";
import { FaHouse, FaSquarePollHorizontal } from "react-icons/fa6";
import { DropDownItem } from "@/components/nav/DropDownItem";
import { DropDownChildrenItem } from "./DropDownChildren";

export const UserNav = () => {
  return (
    <nav className="mt-12 font-bold">
      <ul className="space-y-1">
        <li>
          <SideNavItem icon={FaHouse} label="Home" link="/web" />
        </li>
        <li>
          <SideNavItem icon={FaMap} label="Explore Village" link="#" />
        </li>
        <li>
         
          <DropDownItem icon={FaSquarePollHorizontal} label="Tourism Package">
            <DropDownChildrenItem
              icon={FaList}
              label="With Our Package"
              link="/web/explore"
            />
            <DropDownChildrenItem
              icon={FaList}
              label="With My Village"
              link="/web/mypackage"
            />
          </DropDownItem>
        </li>
        <li>
          <SideNavItem
            icon={BsFillGridFill}
            label="Dashboard"
            link="/dashbord/managereservation"
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
