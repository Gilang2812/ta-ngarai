import React from "react";
import TableManagementHeader from "../admin/TableManagementHeader";

const CraftTransaction = () => {
  return (
    <section>
      {/* <TableManagementHeader  /> */}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
              Pelanggan
            </th>
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
              Tanggal
            </th>
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
              Produk
            </th>
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
              Total
            </th>
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-4">
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-semibold text-gray-900">
                    Sulaman Silver Cici
                  </div>
                  <div className="text-sm text-gray-500">ID: #RSV001</div>
                </div>
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-4">
              <div className="text-gray-900">10 Juli 2025</div>
              <div className="text-sm text-gray-500">09:30 WIB</div>
            </td>
            <td className="border border-gray-300 px-4 py-4">
              <div className="text-gray-900">
                anting melati besar + anting berkarang
              </div>
              <div className="text-sm text-gray-500">2 items</div>
            </td>
            <td className="border border-gray-300 px-4 py-4">
              <div className="font-semibold text-primary">Rp 1.412.750</div>
            </td>
            <td className="border border-gray-300 px-4 py-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                Sedang Diproses
              </span>
            </td>
            <td className="border border-gray-300 px-4 py-4">
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
                  Lihat Detail
                </button>
                <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors">
                  Terima
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors">
                  Tolak
                </button>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-4">
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-semibold text-gray-900">
                    Dapur Bilih Goreng Bunda Ida
                  </div>
                  <div className="text-sm text-gray-500">ID: #RSV002</div>
                </div>
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-4">
              <div className="text-gray-900">10 Juli 2025</div>
              <div className="text-sm text-gray-500">10:15 WIB</div>
            </td>
            <td className="border border-gray-300 px-4 py-4">
              <div className="text-gray-900">bros burung</div>
              <div className="text-sm text-gray-500">1 item</div>
            </td>
            <td className="border border-gray-300 px-4 py-4">
              <div className="font-semibold text-primary">Rp 355.500</div>
            </td>
            <td className="border border-gray-300 px-4 py-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                Menunggu Pembayaran
              </span>
            </td>
            <td className="border border-gray-300 px-4 py-4">
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
                  Lihat Detail
                </button>
                <button className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 transition-colors">
                  Ingatkan
                </button>
                <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors">
                  Konfirmasi
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default CraftTransaction;
