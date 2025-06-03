import React from "react";
import { StatusBadge } from "./StatusBadge";
import { InfoGrid } from "./InfoGrid";
import { ProductCard } from "./ProductCard";

 
const AdminConfirm = () => {
  const transaction = {
    id: "TRX-2025-002",
    date: "1 Juni 2025, 09:15",
    status: "shipped",
    statusText: "Dikirim",
    user: "maria.sari@email.com",
    total: "Rp 1.010.000",
    payment: "OVO",
    products: [
      {
        name: "Kaos Polos Premium",
        store: "FashionHub",
        details: "Cotton Combed 30s",
        qty: 3,
        price: "Rp 225.000",
      },
      {
        name: "Sepatu Sneakers",
        store: "ShoeWorld",
        details: "Size 42, Warna Putih",
        qty: 1,
        price: "Rp 750.000",
      },
    ],
    shipping: {
      multiple: true,
      details: [
        { store: "FashionHub", courier: "SiCepat", cost: "Rp 15.000" },
        { store: "ShoeWorld", courier: "J&T Express", cost: "Rp 20.000" },
      ],
    },
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#435ebe" }}>
          Konfirmasi Pembayaran {transaction.id}
        </h2>

        <InfoGrid
          items={[
            { label: "Customer", value: transaction.user },
            {
              label: "Status Saat Ini",
              value: (
                <StatusBadge
                  status={transaction.status as "shipped"}
                  text={transaction.statusText}
                />
              ),
            },
            { label: "Metode Pembayaran", value: transaction.payment },
            { label: "Total yang Harus Dibayar", value: transaction.total },
          ]}
        />
      </div>

      <div className="mb-8">
        <h3
          className="text-xl font-semibold mb-4 pb-2 border-b-2"
          style={{ borderColor: "#435ebe" }}
        >
          Detail Produk
        </h3>
        <div className="space-y-3">
          {transaction.products.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3
          className="text-xl font-semibold mb-4 pb-2 border-b-2"
          style={{ borderColor: "#435ebe" }}
        >
          Informasi Pengiriman
        </h3>
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-green-500">
            <div className="font-semibold text-gray-900 mb-2">
              📦 Paket dari TechStore
            </div>
            <div className="text-sm text-gray-600">
              <div>
                <strong>Produk:</strong> Laptop Gaming ASUS ROG
              </div>
              <div>
                <strong>Ongkir:</strong> Rp 50.000 (JNE Cargo)
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-green-500">
            <div className="font-semibold text-gray-900 mb-2">
              📦 Paket dari GamingZone
            </div>
            <div className="text-sm text-gray-600">
              <div>
                <strong>Produk:</strong> Mouse & Keyboard
              </div>
              <div>
                <strong>Ongkir:</strong> Rp 25.000 (SiCepat Regular)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Aksi Admin</h3>
        <div className="flex flex-wrap gap-3 mb-4">
          <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 hover:shadow-lg">
            ✓ Konfirmasi Pembayaran
          </button>
          <button
            className="px-6 py-2 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: "#435ebe" }}
          >
            📧 Kirim Notifikasi
          </button>
          <button
            className="px-6 py-2 border-2 font-semibold rounded-lg transition-all duration-300"
            style={{ borderColor: "#435ebe", color: "#435ebe" }}
          >
            📋 Cetak Invoice
          </button>
        </div>

        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <strong>Catatan:</strong> Setelah konfirmasi, sistem akan otomatis
          memberitahu seller untuk memproses pengiriman.
        </div>
      </div>
    </div>
  );
};
export default AdminConfirm;
