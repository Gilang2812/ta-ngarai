import { SideNavItem } from "@/components/nav/SideNavItem" 
import { FaBed, FaBullhorn, FaHouse, FaPagelines, FaSquarePollHorizontal, FaUsers   } from "react-icons/fa6"
 
export const AdminNav=()=>{
    return   <nav className="mt-12 font-bold">
    <ul className="space-y-1">
      <li>
        <SideNavItem icon={FaHouse} label="Home" link="/web" />
      </li>
      <li>
        <SideNavItem icon={FaPagelines} label="Manage Village" link="/web" />
      </li>
      <li>
        <SideNavItem icon={FaBullhorn} label="manage reservation" link="/dashbord/managereservation" />
      </li>
      <li>
        <SideNavItem icon={FaSquarePollHorizontal} label="Manage Package" link="/dashbord/package" />
      </li>
      <li>
        <SideNavItem icon={FaBed} label="Manage Homestay" link="/dashboard/homestay" />
      </li>
      <li>
        <SideNavItem icon={FaUsers} label="Manage Users" link="/dashboard/users" />
      </li>
       
    </ul>
  </nav>
}