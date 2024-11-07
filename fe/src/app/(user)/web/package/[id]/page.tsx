"use client";

 
import { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import {
  FaCaretDown,
  FaRegStar,
  FaCartPlus,
  FaSquarePlus,
  FaCirclePlay,
} from "react-icons/fa6";
import Image from "next/image"; 

interface Props {}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MoreInfo: NextPage<Props> = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
    });

    let map: google.maps.Map;

    loader.load().then(() => {
      if (mapRef.current) {
        map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 10,
        });

        new google.maps.Marker({
          position: center,
          map,
        });
      }
    });

    return () => {
      if (map) {
        map = null!;
      }
    };
  }, []);

  return (
    <main className="grid grid-cols-12 gap-6">
      <section className="col-span-7 space-y-8">
        <section className="flex gap-16 p-5 bg-white rounded-xl">
          <Image
            src='/'
            alt="Koto Gadang"
            width={4000}
            height={1000}
            className="h-auto w-72 rounded-xl "
          />
          <article className="space-y-4">
            <h1 className="text-2xl font-bold">Nagari Koto Gadang</h1>
            <div className="flex gap-2 text-2xl text-orange-500">
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
            </div>
            <section>
              <p>Start from</p>
              <h2 className="text-lg font-semibold">Rp 2.975.000</h2>
            </section>
            <section>
              <p>Cultural package</p>
              <p>Min. 15 people</p>
            </section>
            <div className="flex gap-3 font-normal">
              <a
                href="#"
                className="flex items-center px-3 py-2 bg-white border rounded border-customBlue text-customBlue hover:bg-customBlue hover:text-white"
              >
                <FaCartPlus /> Add to Cart
              </a>
              <a
                className="px-3 py-2 text-white bg-green-700 rounded hover:bg-green-900 "
                href="#"
              >
                Book Now
              </a>
            </div>
          </article>
        </section>

        <section className="p-5 bg-white rounded-xl">
          <header className="text-xl font-semibold text-center">
            <h2>Package Information</h2>
          </header>
          <section className="grid grid-cols-2 space-y-4 leading-loose">
            <article className="col-span-1">
              <p>Name</p>
              <p>Package Type</p>
              <p>Contact Person</p>
              <p>Minimum Capacity</p>
              <p>Price</p>
            </article>
            <article className="col-span-1">
              <p>1 day sumpu trip</p>
              <p>Cultural</p>
              <p>0852784654635</p>
              <p>15 people</p>
              <p>Rp 2.957.424</p>
            </article>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold">Service Include</h3>
            <ul className="px-5 list-disc">
              <li>Tour Guide</li>
              <li>Lunch</li>
              <li>Mineral water</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Service Exclude</h3>
            <ul className="px-5 list-disc">
              <li>Excludes any personal expenses</li>
              <li>Transportation not included</li>
              <li>Additional meals and drinks</li>
            </ul>
          </section>
        </section>

        <section className="p-5 bg-white rounded-xl">
          <header className="grid grid-cols-12">
            <h2 className="col-span-9 text-lg font-semibold text-right">Package Itinerary</h2>
            <div className="col-span-3 text-right">
              <button
                type="submit"
                className="flex items-center gap-2 px-3 py-2 border rounded border-customBlue text-customBlue hover:bg-customBlue hover:text-white"
              >
                <FaSquarePlus /> Extend
              </button>
            </div>
          </header>

          <section>
            <h3 className="text-lg font-semibold">Day 1</h3>
            <ol className="px-4 list-decimal">
              <li>Pertunjukan Silat Tradisional Sumpu</li>
              <li>Edukasi Memasak</li>
              <li>Maambiak Manila Sawo</li>
              <li>Manyulam (Sumpu shawl embroidery education)</li>
              <li>Dapur Bilih Goreng Bunda Ida</li>
            </ol>
          </section>

          <footer className="mt-16">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 bg-white border rounded border-customBlue text-customBlue hover:bg-customBlue hover:text-white"
            >
              <FaCirclePlay /> Play Video
            </button>
          </footer>
        </section>

        <section className="p-5 space-y-12 bg-white rounded-xl">
          <header className="text-lg">
            <h3 className="font-semibold">Our Gallery</h3>
          </header>
          <div className="grid items-start grid-cols-4 gap-6">
            {/* <Image
              src={gambar}
              width={1000}
              height={1000}
              alt="Gallery image"
              className="rounded"
            />
            <Image
              src={gambar}
              width={1000}
              height={1000}
              alt="Gallery image"
              className="rounded"
            />
            <Image
              src={gambar}
              width={1000}
              height={1000}
              alt="Gallery image"
              className="rounded"
            />
            <Image
              src={gambar}
              width={1000}
              height={1000}
              alt="Gallery image"
              className="rounded"
            /> */}
          </div>
        </section>

        <section className="p-5 bg-white rounded-xl">
          <header className="mb-8 text-lg text-center">
            <h3 className="font-semibold">Package Review</h3>
          </header>
          <article className="text-center">
            <p>There are no reviews yet</p>
          </article>
        </section>
      </section>

      <section className="col-span-5 p-5 space-y-8 bg-white rounded-lg">
        <header className="space-y-2 text-lg">
          <h3 className="font-semibold">Google Maps</h3>
         
        </header>

        <section ref={mapRef} style={containerStyle}></section>
      </section>
    </main>
  );
};

export default MoreInfo;
