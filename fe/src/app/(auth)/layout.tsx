import { AuthHeader } from "@/components/auth/AuthHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-lvh bg-secondary">
      <AuthHeader />
      <main className="flex items-center justify-center grow ">
        <section className="max-w-lg grow ">{children}</section>
       
      </main>
      <footer className="py-4 text-center text-white bg-transparant">
        <p>
          &copy; {currentYear} Gilang Kharisma, All rights reserved.
        </p>
      </footer> 
    </div>
  );
}
