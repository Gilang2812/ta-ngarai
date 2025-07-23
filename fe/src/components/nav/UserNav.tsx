import { SideNavItem } from "@/components/nav/SideNavItem";
import { BsFillGridFill } from "react-icons/bs";
import { FaInstagram, FaList, FaMap, FaTiktok } from "react-icons/fa";
import { FaCalendar, FaHouse, FaSquarePollHorizontal } from "react-icons/fa6";
import { DropDownItem } from "@/components/nav/DropDownItem";
import { DropDownChildrenItem } from "./DropDownChildren";
import { TbNeedleThread } from "react-icons/tb"; 
import { ROUTES } from "@/data/routes";
import useUserRole from "@/hooks/useUserRole";
export const UserNav = () => {
  const { isAuth, isAdmin } = useUserRole();
  return (
    <nav className="mt-12 font-bold">
      <ul className="space-y-1">
        <li>
          <SideNavItem icon={FaHouse} label="Home" link={ROUTES.HOME} />
        </li>
        <li>
          <DropDownItem icon={FaMap} label="Explore Village">
            <DropDownChildrenItem
              icon={FaList}
              label="With Our Package"
              link={ROUTES.EXPLORE_WITH_PACKAGE}
            />
            {isAuth && (
              <DropDownChildrenItem
                icon={FaList}
                label="With My Village"
                link={ROUTES.EXPLORE_WITH_MY_VILLAGE}
              />
            )}
          </DropDownItem>
        </li>
        <li>
          <SideNavItem
            icon={FaSquarePollHorizontal}
            label="Tourism Package"
            link={ROUTES.TOURISM_PACKAGE}
          />
        </li>
        {isAuth && (
          <>
            <li>
              <SideNavItem
                icon={BsFillGridFill}
                label="Dashboard"
                link={
                  isAdmin ? ROUTES.MANAGERESERVATION : ROUTES.CRAFT_TRANSACTION
                }
              />
            </li>
            <li>
              <SideNavItem
                icon={FaCalendar}
                label="my transaction"
                link={ROUTES.MY_TRANSACTION}
              />
            </li>
          </>
        )}
        <li>
          <SideNavItem
            icon={TbNeedleThread}
            label="Craft"
            link={ROUTES.CRAFT}
          />
        </li>
        <li className="flex flex-wrap ">
          <SideNavItem
            icon={FaInstagram}
            label="Instagram"
            link={ROUTES.INSTAGRAM}
          />
          <SideNavItem icon={FaTiktok} label="Tiktok" link={ROUTES.TIKTOK} />
        </li>
      </ul>
    </nav>
  );
};
