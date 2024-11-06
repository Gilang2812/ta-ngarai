'use client';

import { Sidebar } from '@/components/global/Sidebar';
import { OpenSidebar } from '@/components/global/SidebarButton';
import { SidebarProvider } from '@/context/SidebarContext';
import Image from 'next/image';
 
export default function ClientSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className="flex min-h-screen bg-[#f2f7ff]">
        <Sidebar />
        <section className="w-screen grow justify-items-stretch xl:w-full font-bold h-screen overflow-x-hidden p-8 font-nunito">
        <header className="flex justify-between mb-10">
            <section className="space-y-4">
              <OpenSidebar />
              <h1 className="text-2xl">Nagari Koto Gadang</h1>
              <h2>Tourism Village</h2>
            </section>
            <aside className="bg-white flex items-center justify-center px-6 rounded-lg cursor-pointer">
              <Image
                src='/images/profile.png'
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
