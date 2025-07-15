import { formatPrice } from "@/lib/priceFormatter";
import { DetailCraftManagementResponse } from "@/type/schema/DetailCraftSchema";
import React from "react";

type Props = {
  data: DetailCraftManagementResponse;
};

const DetailCraftInfo = ({ data }: Props) => {
  return (
    <article className="space-y-8">
      <div>
        <div className="text-sm font-semibold text-slate-500 mb-2 tracking-wider uppercase">
          {data.craft_variant_id}
        </div>
        <h2 className="text-4xl capitalize font-bold text-slate-900 mb-4 leading-tight">
          {`${data.variant.craft.name} ${data.variant.name}`}
        </h2>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary uppercase tracking-wide">
          {data.variant.craft.name}
        </div>
      </div>
      {/* Price Section */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border-l-4 border-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="relative">
          <div className="text-xs font-semibold text-slate-500 mb-1 tracking-wider uppercase">
            Harga Retail
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-2">
            {formatPrice(data.price)}
          </div>
          <div className="text-slate-600 font-medium">
            Modal: {formatPrice(data.modal ?? 0)}
          </div>
        </div>
      </div>
      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Stock Info */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          <div className="text-xs font-semibold text-slate-500 mb-3 tracking-wider uppercase">
            Stok Tersedia
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                data.stock ? "text-green-500" : "text-red-500"
              } animate-pulse`}
            ></div>
            <span
              className={`text-lg font-bold ${
                data.stock ? "text-green-500" : "text-red-500"
              }`}
            >
              {data.stock} Unit
            </span>
          </div>
        </div>

        {/* Image Count */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          <div className="text-xs font-semibold text-slate-500 mb-3 tracking-wider uppercase">
            Total Gambar
          </div>
          <div className="text-lg font-bold text-slate-900">
            {data.images} Foto
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Deskripsi Produk
        </h3>
        <p className="text-slate-600 leading-relaxed">{data.description}</p>
      </div>
    </article>
  );
};

export default DetailCraftInfo;
