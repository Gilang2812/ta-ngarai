"use client";

import { Sidebar } from "@/components/global/Sidebar";
import { OpenSidebar } from "@/components/global/SidebarButton";
import { SidebarProvider } from "@/context/SidebarContext";
import Image from "next/image";
import { AdminNav } from "@/components/nav/AdminNav";

export default function AdminSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <main className=" flex h-lvh relative max-w-screen min-h-screen bg-[#f2f7ff]">
        <Sidebar>
          <AdminNav />
        </Sidebar>
        <section className=" h-screen min-w-min  p-8 overflow-x-hidden font-bold   transition-ease-in-out  grow    font-nunito">
          <header className="flex flex-wrap justify-between mb-10">
            <section className="space-y-4">
              <OpenSidebar />
              <h1 className="text-2xl">Nagari Koto Gadang</h1>
              <h2>Tourism Village</h2>
            </section>
            <aside className="flex items-center justify-center px-6 bg-white rounded-lg cursor-pointer">
              <Image
                src="/images/profile.png"
                width={1000}
                alt="profile"
                height={1000}
                className="size-12"
              />
            </aside>
          </header>
          {children}
        </section>
      </main>
    </SidebarProvider>
  );
}
