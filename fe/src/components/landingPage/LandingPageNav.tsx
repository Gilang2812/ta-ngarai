import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavItem } from "../common/NavItem";
import useToggleOpen from "@/hooks/useToggleOpen";
import useAuth from "@/hooks/useAuth";
import useClickOutside from "@/hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/common/cn";
import { useSession } from "next-auth/react";
import { ROUTES } from "@/data/routes";
import Button from "../common/Button";
type Props = {
  isNavOpen?: boolean;
  onAwardClick: () => void;
};

const LandingPageNav = ({ isNavOpen, onAwardClick }: Props) => {
  const { isOpen, toggle, setIsOpen } = useToggleOpen();
  const { status } = useSession();
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });
  const { handleLogout } = useAuth();

  if (status === "loading") return null;
  return (
    <nav
      className={cn(
        " space-x-9 font-opensans flex gap-4 items-center ",
        isNavOpen ? "max-h-[999px]" : "max-h-0 md:max-h-full"
      )}
    >
      <Link className="text-primary" href="/">
        HOME
      </Link>
      <NavItem label="EXPLORE" link="/web" />
      {/* <a
          onClick={onAboutClick}
          className="cursor-pointer hover:text-primary transition-ease-in-out"
        >
          ABOUT
        </a> */}
      <a
        onClick={onAwardClick}
        className="cursor-pointer hover:text-primary transition-ease-in-out"
      >
        AWARD
      </a>

      <div>
        {status === "authenticated" ? (
          <div ref={ref} className="relative">
            <button
              type="button"
              className="flex items-center justify-center min-w-fit p-4 bg-white rounded-lg cursor-pointer"
              onClick={() => {
                toggle(); 
              }}
            >
              <Image
                src="/images/profile.png"
                width={1000}
                alt="profile"
                height={1000}
                className="size-8 min-w-8 flex-1 aspect-square"
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
                  className={`absolute z-50 top-full hover:[&_li]:bg-primary/50 [&_li]:px-2 [&_li]:transition [&_li]:ease-in-out [&_li]:duration-300 border bg-white/30 backdrop-blur-sm  right-0  w-48 shadow-lg rounded-lg py-2 `}
                >
                  <li>
                    <Link href={ROUTES.PROFILE}>Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} type="button">
                      Logout
                    </button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Button asChild>
            <Link href={ROUTES.LOGIN} className=" w-fit">
              Login
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default LandingPageNav;
