import { SideNavItem } from "@/components/nav/SideNavItem";
import {
  FaBed,
  FaBullhorn,
  FaHouse,
  FaPagelines,
  FaPuzzlePiece,
  FaScroll,
  FaSquarePollHorizontal,
  FaUsers,
} from "react-icons/fa6";
import { DropDownItem } from "@/components/nav/DropDownItem";
import { useSidebar } from "@/context/SidebarContext";
import { DropDownChildrenItem } from "./DropDownChildren";

export const AdminNav = () => {
  const { openDd } = useSidebar();
  return (
    <nav className="mt-12 font-bold">
      <ul className="space-y-1">
        <li>
          <SideNavItem icon={FaHouse} label="Home" link="/web" />
        </li>
        <li>
          <DropDownItem icon={FaPagelines} label="Manage Village">
            <DropDownChildrenItem icon={FaPagelines} label="data village" link="/dashboard/koto" />
            <DropDownChildrenItem icon={FaScroll} label="Announcement" link="/dashboard/announcement" />
          </DropDownItem>
        </li>
        <li
          className={`px-4 ${
            openDd ? "max-h-96 " : "max-h-0"
          } transition-ease-in-out-7    overflow-hidden `}
        ></li>
        <li>
          <SideNavItem
            icon={FaBullhorn}
            label="manage reservation"
            link="/dashbord/managereservation"
          />
        </li>
        <li>
          <DropDownItem icon={FaSquarePollHorizontal} label="Manage Package">
            <DropDownChildrenItem icon={FaSquarePollHorizontal} label="Data Package" link="/dashboard/package" />
            <DropDownChildrenItem icon={FaPuzzlePiece} label="Package Type" link="/dashboard/packagetype" />
            <DropDownChildrenItem icon={FaPuzzlePiece} label="Service Package" link="/dashboard/servicepackage" />
          </DropDownItem> 
        </li>
        <li>
          <SideNavItem
            icon={FaBed}
            label="Manage Homestay"
            link="/dashboard/homestay"
          />
        </li>
        <li>
          <SideNavItem
            icon={FaUsers}
            label="Manage Users"
            link="/dashboard/users"
          />
        </li>
      </ul>
    </nav>
  );
};
