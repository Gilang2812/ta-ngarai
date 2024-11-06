import { useSidebar } from '@/context/SidebarContext';
import Image from 'next/image';
import { FaInstagram, FaMap, FaRegMoon, FaRegSun, FaThLarge, FaTiktok } from 'react-icons/fa';
import { FaHouse, FaSquarePollHorizontal, FaX } from 'react-icons/fa6';  
import { Logo } from '@/components/Logo';
export const Sidebar = () => {
  const { open, toggleSidebar } = useSidebar();

  return (
    <div>
      <aside
    className={`z-50 transform ${
      open ? "translate-x-0" : "-translate-x-full"
      } absolute xl:static transition-transform duration-500 ease-out min-w-[300px] bg-white h-screen col-span-2 p-10 py-12 xl:translate-x-0`}
   >
        <FaX
        onClick={toggleSidebar}
        className="absolute xl:hidden cursor-pointer right-7 text-xl top-5 text-customBlue hover:text-customBg"
        />
      <header className="flex flex-col items-center gap-10">
        <div className="flex justify-between w-full">
          <Logo className="size-8" />
          <div className="flex items-center gap-3">
            <FaRegSun />
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
            </label>
            <FaRegMoon />
          </div>
        </div>
        
        <div className="rounded-full overflow-hidden size-20">
          <Image src='/images/carousel-1.jpg' alt="profile" width={500} height={1000} />
        </div>
        
        <section className="text-center">
          <p><strong>Hello, Zuherman</strong></p>
          <p><small><strong>@adminKotoGadang</strong></small></p>
        </section>
      </header>

      <nav className="mt-12 font-bold">
        <ul className="space-y-4">
          <li className="flex items-center gap-4 p-2 px-4 text-white rounded-lg bg-primary">
            <FaHouse />
            <a href="#">Home</a>
          </li>
          <li className="flex items-center gap-4 p-2 px-4 rounded-lg">
            <FaMap />
            <a href="#">Explore Village</a>
          </li>
          <li className="flex items-center gap-4 p-2 px-4 rounded-lg">
            <FaSquarePollHorizontal />
            <a href="#">Tourism Package</a>
          </li>
          <li className="flex items-center gap-4 p-2 px-4 rounded-lg">
            <FaThLarge />
            <a href="#">Dashboard</a>
          </li>
          <li className="flex items-center gap-4 p-2 px-4 rounded-lg">
            <div className="flex items-center gap-4">
              <FaInstagram />
              <a href="#">Instagram</a>
            </div>
            <div className="flex items-center gap-4">
              <FaTiktok />
              <a href="#">Tiktok</a>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
    </div>
  );
};
