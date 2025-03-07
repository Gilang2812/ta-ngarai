import AdminSidebarLayout from "@/components/common/AdminSidebarLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSidebarLayout  >
      {children}
    </AdminSidebarLayout>
  );
}
