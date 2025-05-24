import React from "react";

const DetailCraftHeader = () => {
  return (
    <header className="relative bg-gradient-to-r from-primary to-secondary px-10 py-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10">
        <p className="text-white/70 text-sm font-medium mb-2 tracking-wide">
          Nagari Koto Gadang / Tourism Village / Management Craft
        </p>
        <h3 className="text-3xl font-bold text-white mb-1">
          Detail Produk Kerajinan
        </h3>
        <p className="text-white/80 text-base">
          Koleksi Eksklusif Perhiasan Kerajinan
        </p>
      </div>
    </header>
  );
};

export default DetailCraftHeader;
