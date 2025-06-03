import React from "react";

type Props = {};

const HistoryList = (props: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 transition-all duration-300 hover:shadow-lg hover:border-primary-300">
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold text-gray-700">#TRX-001-2024</div>
        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
          Berhasil
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Tanggal</div>
          <div className="font-medium text-gray-700">15 Mei 2024</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Total</div>
          <div className="font-medium text-gray-700">Rp 250.000</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Produk</div>
          <div className="font-medium text-gray-700">Sepatu Nike Air Max</div>
        </div>
      </div>
      <button className="bg-primary-500 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-primary-600 active:scale-95">
        Lihat Detail
      </button>
    </div>
  );
};

export default HistoryList;
