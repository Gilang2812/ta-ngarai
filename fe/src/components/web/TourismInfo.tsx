import Image from "next/image";

export default function TourismInfo() {
  return (
    <div className="bg-white rounded-lg">
      <header className="py-5 text-lg text-center">
        <h1>Nagari Koto Gadang</h1>
      </header>
      <section className="overflow-x-hidden p-5 max-h-[550px]">
        <figure>
          <Image
            src='/images/bg-header'
            alt="Nagari Koto Gadang"
            width={1000}
            height={1000}
            className="w-full rounded-lg"
          />
          <figcaption className="mt-2 text-center">Nagari Koto Gadang</figcaption>
        </figure>
        <table className="mt-4 text-lg border-separate border-spacing-5">
          <tbody className="text-left">
            <tr>
              <td>Name</td>
              <td>Nagari Koto Gadang</td>
            </tr>
            <tr>
              <td>Type of Tourism</td>
              <td>Culture and Ecotourism</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>Nagari Koto Gadang, Kecamatan IV Koto, Kabupaten Agam, Sumatera Barat</td>
            </tr>
            <tr>
              <td>Open</td>
              <td>08:30:00</td>
            </tr>
            <tr>
              <td>Close</td>
              <td>18:30:00</td>
            </tr>
            <tr>
              <td>Contact Person</td>
              <td>081374519594</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
