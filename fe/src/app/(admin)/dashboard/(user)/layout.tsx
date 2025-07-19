import UserAuthLayout from "@/layouts/UserAuthLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <UserAuthLayout>{children}</UserAuthLayout>;
};

export default layout;
