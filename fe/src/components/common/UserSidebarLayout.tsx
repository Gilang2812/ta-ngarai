"use client";

import { Sidebar } from "@/components/common/Sidebar";
import { OpenSidebar } from "@/components/common/SidebarButton";
import { SidebarProvider } from "@/context/SidebarContext";
import Image from "next/image";
import { UserNav } from "@/components/nav/UserNav";
import { FaCartShopping } from "react-icons/fa6";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function UserSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleNavigation = (url: string) => {
    startTransition(() => {
      router.push(url);
    });
  };
  return (
    <SidebarProvider>
      <main className="flex min-h-dvh items-stretch    bg-basic">
        <Sidebar handleNavigation={handleNavigation}>
          <UserNav handleNavigation={handleNavigation} />
        </Sidebar>
        <section className="flex-1  w-10   p-8 overflow-hidden font-bold justify-items-stretch  font-nunito">
          <header className="flex justify-between mb-10">
            <section className="space-y-4">
              <OpenSidebar />
              <h1 className="text-2xl">Nagari Koto Gadang</h1>
              <h2>Tourism Village</h2>
            </section>
            <section className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-center px-5 bg-white rounded-lg cursor-pointer">
                <a href="/web/cart">
                  <FaCartShopping />
                </a>
              </div>
              <div className="flex items-center justify-center px-5 bg-white rounded-lg cursor-pointer">
                <Image
                  src="/images/profile.png"
                  width={200}
                  alt="profile"
                  height={200}
                  className="size-12"
                />
              </div>
            </section>
          </header>
          {isPending ? <Loading /> : children}
        </section>
      </main>
    </SidebarProvider>
  );
}
