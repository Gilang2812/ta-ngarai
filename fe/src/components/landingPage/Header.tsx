import Link from "next/link";
import React from "react";
import { Logo } from "@/components/Logo";

interface HeaderProps {
  onAboutClick: () => void;
  onAwardClick: () => void;
}

export function Header({ onAboutClick, onAwardClick }: HeaderProps) {
  return (
    <header className="shadow  z-50 fixed w-full font-quicksand bg-white top-0 flex justify-between px-12 items-center py-1">
      <Link
        className="flex text-primary justify-center gap-4 items-center font-semibold text-custom"
        href="/"
      >
        <Logo />
        <span className="">Tourism Village</span>
      </Link>
      <nav className="space-x-9 font-opensans">
        <Link className="text-primary" href="/">
          HOME
        </Link>
        <Link href="/web">EXPLORE</Link>
        {/* When About is clicked, scroll to WhyVisitSection */}
        <a onClick={onAboutClick} className="cursor-pointer">
          ABOUT
        </a>
        {/* When Award is clicked, scroll to GeoparkSection */}
        <a onClick={onAwardClick} className="cursor-pointer">
          AWARD
        </a>
        <Link
          href="/login"
          className="bg-primary text-white px-4 py-2 text-sm font-semibold hover:bg-secondary focus:ring focus:ring-blue-200"
        >
           Login 
        </Link>
      </nav>
    </header>
  );
}
