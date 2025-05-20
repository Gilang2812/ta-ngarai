import { SideNavItem } from "@/components/nav/SideNavItem";
import {
  FaBed,
  FaBullhorn,
  FaHouse,
  FaPagelines,
  FaPenToSquare,
  FaPuzzlePiece,
  FaScroll,
  FaSquarePollHorizontal,
  FaStore,
  FaUsers,
} from "react-icons/fa6";
import { DropDownItem } from "@/components/nav/DropDownItem";
import { DropDownChildrenItem } from "./DropDownChildren";

export const AdminNav = () => {
  return (
    <nav className="mt-12 font-bold">
      <ul className="space-y-1">
        <li>
          <SideNavItem icon={FaHouse} label="Home" link="/web" />
        </li>
        <li>
          <DropDownItem icon={FaPagelines} label="Manage Village">
            <DropDownChildrenItem
              icon={FaPagelines}
              label="data village"
              link="/dashboard/koto"
            />
            <DropDownChildrenItem
              icon={FaScroll}
              label="Announcement"
              link="/dashboard/announcement"
            />
          </DropDownItem>
        </li>

        <li>
          <SideNavItem
            icon={FaBullhorn}
            label="manage reservation"
            link="/dashboard/managereservation"
          />
        </li>
        <li>
          <DropDownItem icon={FaSquarePollHorizontal} label="Manage Package">
            <DropDownChildrenItem
              icon={FaSquarePollHorizontal}
              label="Data Package"
              link="/dashboard/package"
            />
            <DropDownChildrenItem
              icon={FaPuzzlePiece}
              label="Package Type"
              link="/dashboard/packagetype"
            />
            <DropDownChildrenItem
              icon={FaPuzzlePiece}
              label="Service Package"
              link="/dashboard/servicepackage"
            />
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
        <li>
          <SideNavItem
            icon={FaStore}
            label="Manage Marketplace"
            link="/dashboard/umkm"
          />
        </li>
        <li>
          <SideNavItem
            icon={FaPenToSquare}
            label="Manage Craft"
            link="/dashboard/craft"
          />
        </li>
      </ul>
    </nav>
  );
};
