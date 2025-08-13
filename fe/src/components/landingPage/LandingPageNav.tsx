import React from "react";
import Button from "../common/Button";
import Link from "next/link";
import Image from "next/image";
import { NavItem } from "../common/NavItem";
import useToggleOpen from "@/hooks/useToggleOpen";
import useAuth from "@/hooks/useAuth";
import useClickOutside from "@/hooks/useOutsideClick";
import { motion } from "framer-motion";
import { ROUTES } from "@/data/routes";
import { cn } from "@/utils/common/cn";
type Props = {
  isNavOpen?: boolean;
  onAwardClick: () => void;
};

const LandingPageNav = ({ isNavOpen, onAwardClick }: Props) => {
  const { isOpen, toggle, setIsOpen } = useToggleOpen();
  const { user, handleLogout } = useAuth();
  const ref = useClickOutside<HTMLUListElement>(() => {
    setIsOpen(false);
  });
  return (
    <nav className={cn(" space-x-9 font-opensans flex gap-4 items-center ",isNavOpen ? "max-h-[999px]" : "max-h-0 md:max-h-full")}>
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
        {user ? (
          <div className="relative">
            <button
              type="button"
              className="flex items-center justify-center min-w-fit p-4 bg-white rounded-lg cursor-pointer"
              onClick={toggle}
            >
              <Image
                src="/images/profile.png"
                width={1000}
                alt="profile"
                height={1000}
                className="size-8 min-w-8 flex-1 aspect-square"
              />
            </button>
            <motion.ul
              layout
              ref={ref}
              className={`absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg p-2 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <a href="/web/profile">Profile</a>
              </li>
              <li>
                <button onClick={handleLogout} type="button">
                  Logout
                </button>
              </li>
            </motion.ul>
          </div>
        ) : (
          <Button className=" w-fit" asChild>
            <Link href={ROUTES.LOGIN}>Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default LandingPageNav;
