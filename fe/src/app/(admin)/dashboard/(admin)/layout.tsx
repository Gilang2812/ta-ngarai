import AdminAuthLayout from "@/layouts/AdminAuthLayout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <AdminAuthLayout>{children}</AdminAuthLayout>;
};

export default Layout;
