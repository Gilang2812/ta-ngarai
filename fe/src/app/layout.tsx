import type { Metadata } from "next";
import { ReactQueryProvider } from "@/layout/ReactQueryClientProvider";
import "./globals.css";
import "swiper/css/bundle";
import "swiper/css";
import Script from "next/script";
import { ResultErrorProps, ResultProps } from "@/type/props/ResultProps";
import ReactGoogleOAuthProvider from "@/layout/ReactGoogleOAuthProvider";
import SocketLayout from "@/layout/SocketLayout";

export const metadata: Metadata = {
  title: "Desa Wisata Koto Gadang",
  description:
    "Desa Wisata Koto Gadang - Nikmati keindahan alam dan budaya Minangkabau yang khas di Koto Gadang.",
  icons: "/logo.svg",
};
declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess: (result: ResultProps) => void;
          onPending: (result: ResultProps) => void;
          onError: (result: ResultErrorProps) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactGoogleOAuthProvider>
      <ReactQueryProvider>
        <SocketLayout>
          <html lang="en">
            <body className={` font-nunito antialiased`}>
              {children}
              <Script
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
                strategy="beforeInteractive"
              />
            </body>
          </html>
        </SocketLayout>
      </ReactQueryProvider>
    </ReactGoogleOAuthProvider>
  );
}
