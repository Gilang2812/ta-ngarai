import Link from "next/link";
import React from "react";
import { Logo } from "@/components/Logo";
import LandingPageNav from "./LandingPageNav";
import { FaBars } from "react-icons/fa6";
import useToggleOpen from "@/hooks/useToggleOpen";

interface HeaderProps {
  onAboutClick?: () => void;
  onAwardClick: () => void;
}

export function Header({
  //  onAboutClick,
  onAwardClick,
}: HeaderProps) {
  const { isOpen, toggle } = useToggleOpen();
  return (
    <header className="min-w-fit shadow min-h-fit md:min-h-0 h-20 overflow-hidden   sticky top-0 z-50 w-full font-quicksand bg-white flex gap-8 justify-between px-12 items-center py-1">
      <Link
        className="flex text-primary justify-center   gap-4 items-center font-semibold text-custom"
        href="/"
      >
        <div className="size-16   flex items-center justify-center">
          <Logo />
        </div>
        <p className="text-custom text-nowrap">Tourism Village</p>
      </Link>
      <LandingPageNav isNavOpen={isOpen} onAwardClick={onAwardClick} />
      <button
        onClick={toggle}
        type="button"
        className="md:hidden  p-2 border-4 px-3 text-gray-500 border-gray-500"
      >
        <FaBars />
      </button>
    </header>
  );
}
