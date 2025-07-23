"use client";
import withAuth from "@/utils/common/withAuth";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default withAuth(AuthLayout, { role: "guest" });
