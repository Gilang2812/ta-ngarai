"use client";
import { Header } from "@/components/landingPage/Header";
import WelcomeSection from "@/components/landingPage/WelcomeSection";
import CarouselArticle from "@/components/landingPage/CarouselArticle";
import { GeoparkSection } from "@/components/landingPage/GeoparkSection";
import { Footer } from "@/components/landingPage/Footer";
import React, { useRef } from "react";
import ScrollToTop from "@/components/landingPage/ScrollToTop";

export default function Home() {
  const geoparkRef = useRef<HTMLElement | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-w-fit relative mx-auto">
      <div className="h-screen mb-8">
        <Header onAwardClick={() => scrollToSection(geoparkRef)} />
        <section className="z-[-1] h-[calc(100vh-5rem)] min-w-[640px] grow grid grid-cols-1 lg:grid-cols-2">
          <WelcomeSection />
          <CarouselArticle />
        </section>
      </div>
      <section ref={geoparkRef}>
        <GeoparkSection />
      </section>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
