import Link from "next/link";
import React from "react";
import { Logo } from "@/components/Logo";
import { NavItem } from "./../common/NavItem";

interface HeaderProps {
  onAboutClick: () => void;
  onAwardClick: () => void;
}

export function Header({ onAboutClick, onAwardClick }: HeaderProps) {
  return (
    <div className="shadow sticky top-0 z-50 w-full font-quicksand bg-white flex justify-between px-12 items-center py-1">
      <Link
        className="flex text-primary justify-center   gap-4 items-center font-semibold text-custom"
        href="/"
      >
        <div className="size-16   flex items-center justify-center">
          <Logo />
        </div>
        <p className="text-custom">Tourism Village</p>
      </Link>
      <nav className="space-x-9 font-opensans">
        <Link className="text-primary" href="/">
          HOME
        </Link>
        <NavItem label="EXPLORE" link="/web" />
        <a
          onClick={onAboutClick}
          className="cursor-pointer hover:text-primary transition-ease-in-out"
        >
          ABOUT
        </a>
        <a
          onClick={onAwardClick}
          className="cursor-pointer hover:text-primary transition-ease-in-out"
        >
          AWARD
        </a>
        <Link
          href="/login"
          className="bg-primary text-white px-4 py-2 text-sm font-semibold transition-ease-in-out hover:bg-success focus:ring focus:ring-blue-200"
        >
          Login
        </Link>
      </nav>
    </div>
  );
}
