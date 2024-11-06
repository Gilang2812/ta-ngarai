'use client'
import React from "react";
import { useInView } from "react-intersection-observer";

export   function GeoparkSection() {
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
        <center className="bg-black/50 p-20 ">
          <p>UNESCO GLOBAL GEOPARK</p>
          <p>UNESCO GLOBAL GEOPARK</p>
          <p>UNESCO GLOBAL GEOPARK</p>
          <p>UNESCO GLOBAL GEOPARK</p>
          <p>UNESCO GLOBAL GEOPARK</p>
        </center>
      </article>
       
    </section>
  );
}
