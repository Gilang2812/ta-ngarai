import type { Metadata } from "next";
import { ReactQueryProvider } from "@/context/ReactQueryClientProvider";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css/bundle";
import "swiper/css";
import Script from "next/script";

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
          onSuccess: (result: unknown) => void;
          onPending: (result: unknown) => void;
          onError: (result: unknown) => void;
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
    <ReactQueryProvider>
      <html lang="en">
        <body className={` font-nunito antialiased`}>
          {children}{" "}
          <Script
            src="https://app.sandbox.midtrans.com/snap/snap.js"
            data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
            strategy="beforeInteractive"
          />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
