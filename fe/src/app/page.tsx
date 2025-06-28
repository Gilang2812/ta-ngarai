"use client";
import { Header } from "@/components/landingPage/Header";
import WelcomeSection from "@/components/landingPage/WelcomeSection";
import CarouselArticle from "@/components/landingPage/CarouselArticle";
import { WhyVisitSection } from "@/components/landingPage/WhyVisitSection";
import { GeoparkSection } from "@/components/landingPage/GeoparkSection";
import { Footer } from "@/components/landingPage/Footer";
import React, { useRef } from "react"; 
import ScrollToTop from "@/components/landingPage/ScrollToTop";

export default function Home() {
  // Define refs for each section
  const whyVisitRef = useRef<HTMLElement | null>(null);
  const geoparkRef = useRef<HTMLElement | null>(null);

  // Function to scroll to specific section
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative mx-auto overflow-x-hidden">
      <div className =" min-h-dvh flex flex-col items-stretch  ">
        <Header 
          onAboutClick={() => scrollToSection(whyVisitRef)}
          onAwardClick={() => scrollToSection(geoparkRef)}
        />
        <section className="z-10 min-w-[640px] h-max grow grid  grid-cols-2  ">
          <WelcomeSection />
          <CarouselArticle />
        </section>
      </div>
      {/* Attach ref to WhyVisitSection */}
      <section ref={whyVisitRef}>
        <WhyVisitSection />
      </section>
      {/* Attach ref to GeoparkSection */}
      <section ref={geoparkRef}>
        <GeoparkSection />
      </section>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
