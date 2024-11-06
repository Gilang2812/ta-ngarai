'use client'
import {Header} from "@/components/landingPage/Header";
import {WelcomeSection} from "@/components/landingPage/WelcomeSection"; 
import CarouselArticle from "@/components/landingPage/CarouselArticle";
import {WhyVisitSection} from "@/components/landingPage/WhyVisitSection";
import {GeoparkSection} from "@/components/landingPage/GeoparkSection"; 
import {Footer} from "@/components/landingPage/Footer";
import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

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
    <main className="mx-auto overflow-x-hidden">
      <Header 
        onAboutClick={() => scrollToSection(whyVisitRef)} 
        onAwardClick={() => scrollToSection(geoparkRef)} 
      />
      <section className="z-10 grid grid-cols-1 lg:grid-cols-2">
        <WelcomeSection />
        <CarouselArticle />
      </section>
      {/* Attach ref to WhyVisitSection */}
      <section ref={whyVisitRef}>
        <WhyVisitSection />
      </section>
      {/* Attach ref to GeoparkSection */}
      <section ref={geoparkRef}>
        <GeoparkSection />
      </section>
      <Footer />
    </main>
  );
}
