"use client";
import { Sidebar } from "@/components/common/Sidebar";
import { OpenSidebar } from "@/components/common/SidebarButton";
import Image from "next/image";
import { Suspense } from "react";
import ManagementSkeletonLoader from "../components/loading/ManagementSkeletonLoader";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import Button from "@/components/common/Button";
import { AnimatePresence, motion } from "framer-motion";
import useToggleOpen from "@/hooks/useToggleOpen";
import useAuth from "@/hooks/useAuth";
import { ROUTES } from "@/data/routes";
import useClickOutside from "@/hooks/useOutsideClick";
import NotifInvitations from "./NotifInvitations";

export default function SidebarLayout({
  children,
  NavComponent,
}: {
  children: React.ReactNode;
  NavComponent: () => JSX.Element;
}) {
  const { isOpen, toggle, setIsOpen } = useToggleOpen();
  const { user, handleLogout } = useAuth();
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });
  return (
    <main className=" flex h-lvh relative min-w-fit max-w-screen  max-h-screen overflow-clip   bg-basic">
      <Sidebar>
        <NavComponent />
      </Sidebar>
      <section className=" min-h-screen overflow-x-hidden p-8 over  bg-basic font-bold   transition-ease-in-out  grow  font-nunito">
        <header className="flex flex-wrap justify-between mb-10">
          <section className="space-y-4">
            <OpenSidebar />
            <h1 className="text-2xl">Nagari Koto Gadang</h1>
            <h2>Tourism Village</h2>
          </section>
          <div>
            {user ? (
              <section className="grid grid-cols-3 gap-2 grid-flow-col">
                <NotifInvitations />
                <div>
                  <Link
                    className="flex w-full h-full border border-transparent aspect-square transition-ease-in-out hover:bg-primary/10 hover:shadow-xl items-center justify-center p-4 hover:border-primary bg-white rounded-lg cursor-pointer"
                    href={ROUTES.CART}
                  >
                    <FaCartShopping />
                  </Link>
                </div>
                <div className="relative" ref={ref}>
                  <button
                    type="button"
                    className="flex items-center hover:bg-primary/10 border border-transparent hover:border-primary hover:shadow-xl transition-ease-in-out justify-center p-4 bg-white rounded-lg cursor-pointer"
                    onClick={toggle}
                  >
                    <Image
                      src="/images/profile.png"
                      width={1000}
                      alt="profile"
                      height={1000}
                      className="size-12"
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.ul
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute z-10  [&_li]:ease-in-out  right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg p-2 `}
                      >
                        <li className="hover:bg-primary transition-ease-in-out hover:text-white">
                          <a href="/web/profile">Profile</a>
                        </li>
                        <li onClick={handleLogout}  className="hover:bg-primary transition-ease-in-out hover:text-white">
                          <button type="button">
                            Logout
                          </button>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </section>
            ) : (
              <Button className=" w-fit" asChild>
                <Link href={ROUTES.LOGIN}>Login</Link>
              </Button>
            )}
          </div>
        </header>
        <Suspense fallback={<ManagementSkeletonLoader />}>{children}</Suspense>
      </section>
    </main>
  );
}
