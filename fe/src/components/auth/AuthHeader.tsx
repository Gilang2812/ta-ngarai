import Link from "next/link";
import { Logo } from "../Logo";
import { NavItem } from "../global/NavItem";

export const AuthHeader = () => {
  return (
    <header className="shadow  z-20 sticky w-full font-quicksand bg-white flex justify-between px-12 items-center py-1">
      <Link
        className="flex text-primary justify-center gap-4 items-center font-semibold text-custom"
        href="/"
      >
        <div className="size-20">
          <Logo />
        </div>
        <span className="">Tourism Village</span>
      </Link>
      <nav className="space-x-9 font-opensans">
        <NavItem label="EXPLORE" link="/web" />
        <NavItem label="ABOUT" link="/" />
      </nav>
    </header>
  );
};
