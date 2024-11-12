"use client";

import { Sidebar } from "@/components/global/Sidebar";
import { OpenSidebar } from "@/components/global/SidebarButton";
import { SidebarProvider } from "@/context/SidebarContext";
import Image from "next/image";
import { AdminNav } from "@/components/nav/AdminNav";
import { Suspense, useTransition } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function AdminSidebarLayout({
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
      <main className=" flex h-lvh relative max-w-screen min-h-screen bg-[#f2f7ff]">
        <Sidebar handleNavigation={handleNavigation}>
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
          <Suspense fallback={<Loading />}> 
          {isPending ? <Loading /> : children} 
          </Suspense>
        </section>
      </main>
    </SidebarProvider>
  );
}
