import { SideNavItem } from "@/components/nav/SideNavItem";
import {
  FaBed,
  FaBullhorn,
  FaHouse,
  FaPagelines,
  FaPuzzlePiece,
  FaScroll,
  FaSquarePollHorizontal,
  FaStore,
  FaUsers,
} from "react-icons/fa6";
import { DropDownItem } from "@/components/nav/DropDownItem";
import { DropDownChildrenItem } from "./DropDownChildren";
import { ROUTES } from "@/data/routes";
import useUserRole from "@/hooks/useUserRole";

export const AdminNav = () => {
  const { isAdmin } = useUserRole();
  return (
    <nav className="mt-12 font-bold">
      <ul className="space-y-1">
        <li>
          <SideNavItem icon={FaHouse} label="Home" link="/web" />
        </li>
        {!isAdmin && (
          <>
            <li>
              <SideNavItem
                icon={FaBullhorn}
                label="manage craft transaction"
                link={ROUTES.MANAGE_CRAFT_TRANSACTION}
              />
            </li>
            <li>
              <SideNavItem
                icon={FaStore}
                label="Your Marketplace"
                link={ROUTES.MARKETPLACE}
              />
            </li>
          </>
        )}
        {isAdmin && (
          <>
            <li>
              <SideNavItem
                icon={FaBullhorn}
                label="manage reservation"
                link={ROUTES.MANAGERESERVATION}
              />
            </li>
            <li>
              <DropDownItem icon={FaPagelines} label="Manage Village">
                <DropDownChildrenItem
                  icon={FaPagelines}
                  label="data village"
                  link={ROUTES.MANAGE_VILLAGE}
                />
                <DropDownChildrenItem
                  icon={FaScroll}
                  label="Announcement"
                  link={ROUTES.ANNOUNCEMENT}
                />
              </DropDownItem>
            </li>

            <li>
              <DropDownItem
                icon={FaSquarePollHorizontal}
                label="Manage Package"
              >
                <DropDownChildrenItem
                  icon={FaSquarePollHorizontal}
                  label="Data Package"
                  link={ROUTES.PACKAGE}
                />
                <DropDownChildrenItem
                  icon={FaPuzzlePiece}
                  label="Package Type"
                  link={ROUTES.PACKAGE_TYPE}
                />
                <DropDownChildrenItem
                  icon={FaPuzzlePiece}
                  label="Service Package"
                  link={ROUTES.SERVICE_PACKAGE}
                />
              </DropDownItem>
            </li>
            <li>
              <SideNavItem
                icon={FaBed}
                label="Manage Homestay"
                link={ROUTES.HOMESTAY}
              />
            </li>
            <li>
              <SideNavItem
                icon={FaUsers}
                label="Manage Users"
                link={ROUTES.MANAGE_USERS}
              />
            </li>
            <li>
              <SideNavItem
                icon={FaStore}
                label="Manage Marketplace"
                link={ROUTES.MANAGE_MARKETPLACE}
              />
            </li>
            <li>
              <DropDownItem icon={FaSquarePollHorizontal} label="Manage Object">
                <DropDownChildrenItem
                  icon={FaSquarePollHorizontal}
                  label="Manage Attraction"
                  link={ROUTES.MANAGE_ATTRACTION}
                />
                <DropDownChildrenItem
                  icon={FaPuzzlePiece}
                  label="Manage Culinary"
                  link={ROUTES.MANAGE_CULINARY}
                />
                <DropDownChildrenItem
                  icon={FaPuzzlePiece}
                  label="Service Worshipme"
                  link={ROUTES.MANAGE_CULINARY}
                />
              </DropDownItem>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
