"use client";
import withAuth from "@/utils/common/withAuth";
import { Fragment } from "react";

function UserAuthLayout({ children }: { children: React.ReactNode }) {
  return <Fragment>{children}</Fragment>;
}

export default withAuth(UserAuthLayout, { role: "auth" });
