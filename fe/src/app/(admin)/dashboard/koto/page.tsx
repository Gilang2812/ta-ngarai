import Image from "next/image";
import { FaPencil } from "react-icons/fa6";
 
export default function DataVillage() {
  return (
    <main className="p-5 pt-8 bg-white rounded-xl">
      <header className="flex justify-between mb-5">
        <h1 className="text-xl font-bold">Manager Village Information</h1>
        <a
          className="flex items-center gap-2 px-3 py-2 text-white rounded bg-customBlue"
          href="#"
          aria-label="Edit Village Information"
        >
          <FaPencil /> Edit Information
        </a>
      </header>
      <section className="grid grid-cols-2 gap-8">
        {/* Left Column: Village Information */}
        <article className="col-span-1 space-y-6 leading-loose">
          <div>
            <h2 className="font-semibold text-customBlue">Name</h2>
            <p>Nagari Koto Gadang</p>
          </div>
          <div>
            <h2 className="font-semibold text-customBlue">Type Of Tourism</h2>
            <p>Culture and Eco Tourism</p>
          </div>
          <div>
            <h2 className="font-semibold text-customBlue">Address</h2>
            <p>
              Nagari Sumpu, Batipuh Selatan, Kabupaten Tanah Datar, Sumatera
              Barat
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold text-customBlue">Open</h2>
              <p>08:30:00</p>
            </div>
            <div>
              <h2 className="font-semibold text-customBlue">Close</h2>
              <p>18:30:00</p>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-customBlue">Ticket Price</h2>
            <p>5000</p>
          </div>
          <div>
            <h2 className="font-semibold text-customBlue">Contact Person</h2>
            <p>0845463123</p>
          </div>
          <div>
            <h2 className="font-semibold text-customBlue">Bank Name</h2>
            <p>Bank Syariah Indonesia</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold text-customBlue">Bank Code</h2>
              <p>451</p>
            </div>
            <div>
              <h2 className="font-semibold text-customBlue">Bank Account Holder Name</h2>
              <p>Desa Wisata Koto Gadang</p>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-customBlue">Bank Account Number</h2>
            <p>345234524</p>
          </div>
          <div>
            <h2 className="font-semibold text-customBlue">QR Code</h2>
            <Image
              src='/'
              alt="QR code for the Nagari Koto Gadang village"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        </article>

        {/* Right Column: Gallery Section */}
        <article className="col-span-1 space-y-4">
          <h2 className="font-semibold text-customBlue">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...Array(5)].map((_, index) => (
              <Image
                key={index}
                src={gambar}
                alt={`Village gallery image ${index + 1}`}
                width={500}
                height={500}
                className="rounded-lg"
              />
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
