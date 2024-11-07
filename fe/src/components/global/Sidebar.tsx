import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import { FaRegMoon, FaRegSun } from "react-icons/fa"; 
import { Logo } from "@/components/Logo";
import { FaX } from "react-icons/fa6";
export const Sidebar = ({children}:{children:React.ReactNode}) => {
  const { open, toggleSidebar } = useSidebar();

  return (
    <div>
      <aside
        className={`z-50 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } absolute xl:static transition-transform duration-500 ease-out min-w-[300px] bg-white h-screen col-span-2 p-8 py-12 xl:translate-x-0`}
      >
        <FaX
          onClick={toggleSidebar}
          className="absolute text-xl cursor-pointer xl:hidden right-7 top-5 text-customBlue hover:text-customBg"
        />
        <header className="flex flex-col items-center gap-8">
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

          <div className="overflow-hidden rounded-full size-20">
            <Image
              src="/images/carousel-1.jpg"
              alt="profile"
              width={500}
              height={1000}
            />
          </div>

          <section className="text-center">
            <p>
              <strong>Hello, Zuherman</strong>
            </p>
            <p>
              <small>
                <strong>@adminKotoGadang</strong>
              </small>
            </p>
          </section>
        </header>
          {children}
      </aside>
    </div>
  );
};
