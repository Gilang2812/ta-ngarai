import ClientSidebarLayout from "@/components/global/UserSidebarLayout";

 
export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientSidebarLayout >
      {children}
    </ClientSidebarLayout>
  );
}
