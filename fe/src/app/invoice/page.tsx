"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "@/components/common/Button";
import Image from "next/image";

export default function InvoicePage() {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    const input = invoiceRef.current;

    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <div className="p-6 font-['Helvetica'] space-y-4">
      <div
        ref={invoiceRef}
        className="bg-white shadow p-8 text-xxs w-full max-w-2xl mx-auto"
      >
        {/* Header */}

        <div className="flex items-center space-x-4">
          <div className="w-16 h-16  rounded-full flex items-center justify-center">
            <Image src="/images/kage.png" alt="Logo" width={50} height={50} />
          </div>
          <div className="font font-medium text-xxs ">
            <h1 className="text-xs font-bold ">Kawasan Saribu Rumah Gadang</h1>
            <p>
              Kawasan Saribu Rumah Gadang, Koto Baru village, Sungai Pagu
              District
            </p>
            <p>South Solok Regency, West Sumatra 27776</p>
          </div>
        </div>

        {/* Horizontal line */}
        <div className="border-t my-4 p-1">
          <div className="text-right mb-4">
            <h2 className="text-lg font-extrabold ">RESERVATION INVOICE</h2>
          </div>

          {/* Customer and Invoice Info */}
          <div className="mb-6">
            <p className=" text-xxs">
              <span className="font-medium">Kepada Yth.</span>
            </p>
            <section className="flex text-xxs">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="font-medium w-16">Name</td>
                    <td className="w-4">:</td>
                    <td>@gilang</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Address</td>
                    <td>:</td>
                    <td>(profil is incomplete)</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Phone</td>
                    <td>:</td>
                    <td>(profil is incomplete)</td>
                  </tr>
                </tbody>
              </table>
              <article className="w-full text-xxs">
                <table>
                  <tbody>
                    <tr>
                      <td className="font-medium">No.Invoice</td>
                      <td className="w-4">:</td>
                      <td>R135</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Request at</td>
                      <td>:</td>
                      <td>Sunday, 27 July 2025 13:36:36</td>
                    </tr>
                  </tbody>
                </table>
              </article>
            </section>
          </div>

          {/* Reservation Details */}
          <div className="mb-6 leading-3">
            <h3 className="text-xxs font-bold  ">Reservation Detail</h3>
            <table className="w-full text-xxs">
              <tbody>
                <tr>
                  <td className="font-medium w-32">Homestay Name</td>
                  <td className="w-4">:</td>
                  <td>Homestay 10</td>
                </tr>
                <tr>
                  <td className="font-medium">Check In</td>
                  <td>:</td>
                  <td>Friday, 8 August 2025 14:00:00</td>
                </tr>
                <tr>
                  <td className="font-medium">Check Out</td>
                  <td>:</td>
                  <td>Sunday, 10 August 2025 12:00:00</td>
                </tr>
                <tr>
                  <td className="font-medium">Day of Stay</td>
                  <td>:</td>
                  <td>2 days</td>
                </tr>
                <tr>
                  <td className="font-medium">Total People</td>
                  <td>:</td>
                  <td>2 people</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pricing Table */}
          <div className="mb-6 text-xxs">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="">
                  <th className="border p-2 text-center text-xs font-bold ">
                    Unit Name
                  </th>
                  <th className="border p-2 text-center text-xs font-bold ">
                    Capacity
                  </th>
                  <th className="border p-2 text-center text-xs font-bold ">
                    Unit Price
                  </th>
                  <th className="border p-2 text-center text-xs font-bold ">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border text-xxs p-2">
                    <div>
                      <div className="font-medium">pesanan Homestay</div>
                      <div>Homestay 10</div>
                    </div>
                  </td>
                  <td className="border p-2  ">2</td>
                  <td className="border p-2  ">Rp 150.000</td>
                  <td className="border p-2  ">Rp 300.000</td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold  ">
                    Grand Total
                  </td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2 font-bold  ">
                    Rp600.000
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold  ">
                    Deposit
                  </td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2 font-bold  ">
                    Rp600.000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Instructions */}
          <div className="mb-6">
            <p>
              please make payment via the web application via the Reservation
              menu -&gt; select Reservation ID -&gt; and click Payment
            </p>
          </div>

          {/* Status Information */}
          <div className="mb-6  ">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="mb-2">
                  <span className="font-medium">Confirmation</span> :
                  Confirmation on{" "}
                  <span className="font-bold">
                    Thursday, 31 July 2025 01:28:15
                  </span>
                </p>
                <p className="ml-16 text-xs ">(by homestay owner)</p>
                <p className="mb-1">
                  <span className="font-medium">Deposit Payment</span> :
                  Incomplete
                </p>
                <p>
                  <span className="font-medium">Full Payment</span> : Incomplete
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Status</span> :{" "}
                  <span className="bg-green-200 px-2 py-1 text-xs font-medium">
                    Paying Deposit
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-right   mt-12">
            <p className="mb-4">Solok Selatan, 1 August 2025</p>
            <p className="mb-8">Best regards,</p>
            <p className="font-medium">Pokdarwis SRG</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
      </div>
    </div>
  );
}
