import type { Metadata } from "next";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactQueryProvider } from "@/context/ReactQueryClientProvider";
import "swiper/css";
import "swiper/css/bundle";

export const metadata: Metadata = {
  title: "Desa Wisata Koto Gadang",
  description: "Desa Wisata Koto Gadang - Nikmati keindahan alam dan budaya Minangkabau yang khas di Koto Gadang.",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={` font-nunito antialiased`}>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}
