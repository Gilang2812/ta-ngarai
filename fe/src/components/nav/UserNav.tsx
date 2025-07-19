import { SideNavItem } from "@/components/nav/SideNavItem";
import { BsFillGridFill } from "react-icons/bs";
import { FaInstagram, FaList, FaMap, FaTiktok } from "react-icons/fa";
import { FaCalendar, FaHouse, FaSquarePollHorizontal } from "react-icons/fa6";
import { DropDownItem } from "@/components/nav/DropDownItem";
import { DropDownChildrenItem } from "./DropDownChildren";
import { TbNeedleThread } from "react-icons/tb";
import { useAuthStore } from "@/stores/AuthStore";
export const UserNav = () => {
  const { user } = useAuthStore();
  return (
    <nav className="mt-12 font-bold">
      <ul className="space-y-1">
        <li>
          <SideNavItem icon={FaHouse} label="Home" link="/web" />
        </li>
        <li>
          <DropDownItem icon={FaMap} label="Explore Village">
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
            icon={FaSquarePollHorizontal}
            label="Tourism Package"
            link="/web/package"
          />
        </li>
        <li>
          <SideNavItem
            icon={BsFillGridFill}
            label="Dashboard"
            link={`/dashboard/${user?.role !== 2 ? "craft" : "managereservation"}`}
          />
        </li>
        <li>
          <SideNavItem
            icon={FaCalendar}
            label="my transaction"
            link="/web/reservation"
          />
        </li>
        <li>
          <SideNavItem icon={TbNeedleThread} label="Craft" link="/web/craft" />
        </li>
        <li className="flex flex-wrap ">
          <SideNavItem icon={FaInstagram} label="Instagram" link="#" />
          <SideNavItem icon={FaTiktok} label="Tiktok" link="#" />
        </li>
      </ul>
    </nav>
  );
};
