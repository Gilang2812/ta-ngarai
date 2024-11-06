// src/components/landingPage/Footer.tsx
export   function Footer() {
    return (
      <footer className="leading-loose text-white bg-slate-900 px-28 pt-28">
        <section className="grid grid-cols-12 pb-10">
          <article className="col-span-9">
            <h2 className="text-xl">
              <strong>Address</strong>
            </h2>
            <br />
            <address>
              Nagari Tarantang, Harau, Kabupaten Lima Puluh Kota, Sumatera Barat
              <br />
              <a href="tel:+6281366771188">+62 813-6677-1188</a>
              <br />
              <a href="mailto:info@desawisatakampunangnagarisumpu.com">@desawisatakampunangnagarisumpu.com</a>
            </address>
          </article>
  
          <nav className="col-span-3">
            <strong>Links</strong>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Explore</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Award</a></li>
            </ul>
          </nav>
        </section>
  
        <hr />
  
        <section className="py-10">
          <p className="text-white">
            &copy; <span className="underline">Gilang Kharisma</span>, All rights reserved.
          </p>
        </section>
      </footer>
    );
  }
  