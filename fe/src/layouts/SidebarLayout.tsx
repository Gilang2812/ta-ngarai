"use client";
import { Sidebar } from "@/components/common/Sidebar";
import { OpenSidebar } from "@/components/common/SidebarButton";
import Image from "next/image";
import { Suspense } from "react";
import ManagementSkeletonLoader from "../components/loading/ManagementSkeletonLoader";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import Button from "@/components/common/Button";
import { useAuthStore } from "@/stores/AuthStore";

export default function SidebarLayout({
  children,
  NavComponent,
}: {
  children: React.ReactNode;
  NavComponent: () => JSX.Element;
}) {
  const { user } = useAuthStore();
  return (
    <main className=" flex h-lvh relative min-w-fit max-w-screen  max-h-screen overflow-clip   bg-basic">
      <Sidebar>
        <NavComponent />
      </Sidebar>
      <section className=" min-h-screen overflow-x-hidden p-8 over  bg-basic font-bold   transition-ease-in-out  grow  font-nunito">
        <header className="flex flex-wrap justify-between mb-10">
          <section className="space-y-4">
            <OpenSidebar />
            <h1 className="text-2xl">Nagari Koto Gadang</h1>
            <h2>Tourism Village</h2>
          </section>
          <div>
            {user ? (
              <section className="grid grid-cols-2 gap-2">
                <Link
                  className="flex items-center justify-center p-4 bg-white rounded-lg cursor-pointer"
                  href="/web/cart"
                >
                  <FaCartShopping />
                </Link>
                <Link
                  href={"/web/profile"}
                  className="flex items-center justify-center p-4 bg-white rounded-lg cursor-pointer"
                >
                  <Image
                    src="/images/profile.png"
                    width={1000}
                    alt="profile"
                    height={1000}
                    className="size-12"
                  />
                </Link>
              </section>
            ) : (
              <Button className="h-fit w-fit" asChild>
                <Link href={"/login"}>Login</Link>
              </Button>
            )}
          </div>
        </header>
        <Suspense fallback={<ManagementSkeletonLoader />}>{children}</Suspense>
      </section>
    </main>
  );
}
