import React from "react";
import Button from "../common/Button";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
 
const ManageCraftOrder = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full font-normal [&_td]:p-2 [&_td]:border-b [&_td]:border-gray-200 hover:[&_tr]:bg-primary/25 transition-colors">
          <thead className="bg-primary-50">
            <tr>
              <th className="px-4 py-4 text-left font-semibold text-gray-700 border-b border-gray-200">
                ID Transaksi
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700 border-b border-gray-200">
                User
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700 border-b border-gray-200">
                Produk
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700 border-b border-gray-200">
                Total
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700 border-b border-gray-200">
                Status
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700 border-b border-gray-200">
                Tanggal
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-700 border-b border-gray-200">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#TRX-001-2024</td>
              <td>John Doe</td>
              <td>Sepatu Nike Air Max</td>
              <td>Rp 250.000</td>
              <td>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                  Berhasil
                </span>
              </td>
              <td>15 Mei 2024</td>
              <td>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-md text-xs font-medium transition-all duration-300 hover:bg-primary-600">
                  Lihat
                </button>
              </td>
            </tr>
            <tr>
              <td>#TRX-002-2024</td>
              <td>Jane Smith</td>
              <td>Tas Laptop Premium</td>
              <td>Rp 150.000</td>
              <td>
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                  Pending
                </span>
              </td>
              <td>18 Mei 2024</td>
              <td>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-md text-xs font-medium transition-all duration-300 hover:bg-primary-600">
                  Lihat
                </button>
              </td>
            </tr>
            <tr>
              <td>#TRX-003-2024</td>
              <td>Bob Wilson</td>
              <td>Kaos Polos Basic</td>
              <td>Rp 75.000</td>
              <td className="px-4 py-4 border-b border-gray-gray-200">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                  Gagal
                </span>
              </td>
              <td>20 Mei 2024</td>
              <td>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-md text-xs font-medium transition-all duration-300 hover:bg-primary-600">
                  Lihat
                </button>
              </td>
            </tr>
            <tr >
              <td>#TRX-004-2024</td>
              <td className="px-4 py-4 ">Alice Brown</td>
              <td>Jaket Denim</td>
              <td>Rp 320.000</td>
              <td>
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                  Pending
                </span>
              </td>
              <td>22 Mei 2024</td>
              <td className="px-4 py-4 border-b ">
                <Button asChild className="p-1">
                  <Link href={`/reservation/craft`}>
                    <EyeIcon />
                  </Link>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCraftOrder;
