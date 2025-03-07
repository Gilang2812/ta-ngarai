import ClientSidebarLayout from "@/components/common/UserSidebarLayout";

 
export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientSidebarLayout >
      {children}
    </ClientSidebarLayout>
  );
}
