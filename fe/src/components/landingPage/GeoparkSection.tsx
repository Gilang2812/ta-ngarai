"use client";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";

export function GeoparkSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className={`space-y-12 text-white  mx-[10%] mb-8 ${
        inView ? "animate-FadeIn" : "opacity-0"
      }`}
    >
      <article className="  bg-[url('/images/bg-header.jpg')] bg-red-500">
        <center className="bg-black/50 p-20 text-white text-xl space-y-4">
          <Image
            src="/images/trophy.png"
            className="[filter:invert(100%)]"
            alt="Geopark"
            width={100}
            height={100}
          />
          <p> Top 300  ADWI 2024</p>
        </center>
      </article>
    </section>
  );
}
