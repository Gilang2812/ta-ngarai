import { FaEnvelope, FaMapPin, FaPhone } from "react-icons/fa6";

// src/components/landingPage/Footer.tsx
export function Footer() {
  return (
    <footer className="leading-loose  text-white bg-slate-900 px-28 pt-28">
      <div className="container mx-auto flex flex-col gap-10">
        <section className="grid grid-cols-12 border-white border-b-2 w-full   pb-10 ">
          <article className="col-span-9">
            <h2 className="text-xl">
              <strong>Address</strong>
            </h2>
            <br />
            <address className="[&_p]:flex [&_p]:items-center [&_p]:gap-2">
              <p>
                <FaMapPin className="text-2xl" />
                Nagari Koto Gadang, Kecamatan IV Koto , Kabupaten Agam, Sumatera
                Barat
              </p>
              <p>
                <FaPhone /> +62 813-6677-1188
              </p>
              <p>
                <FaEnvelope /> jurian.andika@gmail.com
              </p>
            </address>
          </article>

          <nav className="col-span-3">
            <strong>Links</strong>
            <ul className="hover:[&_li]:text-primary  before:[&_li]:content-['>'] before:[&_li]:mr-2  hover:[&_li]:tracking-[0.0675rem] [&_li]:transition-all [&_li]:duration-500 [&_li]:ease-in-out  text-sm flex flex-col gap-2">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="/web">Explore</a>
              </li>
              <li>
                <a href="#">Award</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
          </nav>
        </section>

        <section className="py-10">
          <p className="text-white">
            &copy; <span className="underline">Gilang Kharisma</span>, All
            rights reserved.
          </p>
        </section>
      </div>
    </footer>
  );
}
