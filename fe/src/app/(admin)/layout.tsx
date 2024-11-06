import ClientSidebarLayout from "@/components/global/ClientSidebarLayout";

 
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientSidebarLayout>
      {children}
    </ClientSidebarLayout>
  );
}
