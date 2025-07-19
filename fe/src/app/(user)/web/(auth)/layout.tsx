import UserAuthLayout from "@/layouts/UserAuthLayout"; 

function Layout({ children }: { children: React.ReactNode }) {
  return <UserAuthLayout>{children}</UserAuthLayout>;
}

export default Layout;
