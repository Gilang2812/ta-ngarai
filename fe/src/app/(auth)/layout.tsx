import { AuthHeader } from "@/components/auth/AuthHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <main className="bg-secondary min-h-lvh  flex items-center justify-center">
        <section className="grow  max-w-lg ">{children}</section>
      </main>
    </>
  );
}
