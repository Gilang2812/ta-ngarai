import Image from "next/image";
import { FaRegCheckCircle } from "react-icons/fa"; 
import { useInView } from "react-intersection-observer";
 

export  function WhyVisitSection() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Hanya trigger sekali
    threshold: 0.1, // Trigger jika 10% dari elemen sudah terlihat
  });

  return (
    <section
      ref={ref}
      className={`  grid grid-cols-1 lg:grid-cols-2 gap-16 py-32 px-44 justify-items-stretch ${
        inView ? "animate-FadeIn" : "opacity-0"
      }`}
    >
      <article className="space-y-5 col-span-1">
        <header>
          <p>#Welcome To Desa Wisata Nagari Koto Gadang</p>
          <h1 className="leading-tight text-custom">Why You Should Visit Desa Wisata</h1>
          <h1 className="leading-tight text-primary">Koto Gadang</h1>
        </header>

        <section>
          <p>
            Kampuang Minang Nagari Sumpu is located in Nagari Sumpur, South Batipuh District, Tanah Datar Regency, West Sumatra, north of Lake Singkarak, which is fed by Batang Sumpu. To get to Kampuang Minang Nagari Sumpu, it is estimated to take about 2 hours from Minangkabau International Airport. In Kampuang Minang Nagari Sumpu there are cultural tours with about 70 traditional houses called Rumah Gadang and several historical sites. Out of the many Rumah Gadang, there are 3 Rumah Gadang that have been used as a homestay for the tourists who visit Kampuang Minang Nagari Sumpu.
          </p>
        </section>

        <footer>
          <nav className="flex flex-col leading-loose">
            <ul>
              <li className="flex items-center">
                <FaRegCheckCircle className="mr-4 text-xl text-primary" />
                <a href="#">Nature Tourism</a>
              </li>
              <li className="flex items-center">
                <FaRegCheckCircle className="mr-4 text-xl text-primary" />
                <a href="#">Cultural Tourism</a>
              </li>
              <li className="flex items-center">
                <FaRegCheckCircle className="mr-4 text-xl text-primary" />
                <a href="#">Educational Tourism</a>
              </li>
              <li className="flex items-center">
                <FaRegCheckCircle className="mr-4 text-xl text-primary" />
                <a href="#">Culinary Tourism</a>
              </li>
            </ul>
          </nav>
        </footer>
      </article>

      <aside className="col-span-1">
        <div className="-translate-x-10 border-4 border-primary">
          <Image
            src='/images/carousel-1.jpg'
            alt="Mountain"
            className="translate-x-10 translate-y-16"
            width={800}
            height={600}
          />
        </div>
      </aside>
    </section>
  );
}
