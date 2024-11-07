import AdminSidebarLayout from "@/components/global/AdminSidebarLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSidebarLayout  >
      {children}
    </AdminSidebarLayout>
  );
}
