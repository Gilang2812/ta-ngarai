import { InfoGrid } from "./InfoGrid";
import { ProductCard } from "./ProductCard";
import { StatusBadge } from "./StatusBadge";

export const UserDetailPage = () => {
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
          Detail Transaksi {transaction.id}
        </h2>

        <InfoGrid
          items={[
            {
              label: "Status",
              value: (
                <StatusBadge
                  status={transaction.status as "shipped"}
                  text={transaction.statusText}
                />
              ),
            },
            { label: "Tanggal Transaksi", value: transaction.date },
            { label: "Metode Pembayaran", value: transaction.payment },
            { label: "Total Pembayaran", value: transaction.total },
          ]}
        />
      </div>

      <div className="mb-8">
        <h3
          className="text-xl font-semibold mb-4 pb-2 border-b-2"
          style={{ borderColor: "#435ebe" }}
        >
          Produk yang Dibeli
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
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-green-500">
          <div className="font-semibold text-gray-900 mb-2">
            📦 Paket dari ElektroMart
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div>
              <strong>Kurir:</strong> JNE Regular
            </div>
            <div>
              <strong>Ongkos Kirim:</strong> Rp 25.000
            </div>
            <div>
              <strong>Estimasi:</strong> 2-3 hari kerja
            </div>
            <div>
              <strong>Alamat Tujuan:</strong> Jl. Sudirman No. 123, Jakarta
              Pusat
            </div>
            <div>
              <strong>No. Resi:</strong> JNE123456789
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3
          className="text-xl font-semibold mb-4 pb-2 border-b-2"
          style={{ borderColor: "#435ebe" }}
        >
          Rincian Pembayaran
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Subtotal Produk:</span>
            <span>Rp 4.650.000</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Ongkos Kirim:</span>
            <span>Rp 25.000</span>
          </div>
          <div
            className="flex justify-between pt-2 border-t border-gray-300 font-semibold"
            style={{ color: "#435ebe" }}
          >
            <span>Total:</span>
            <span>Rp 4.675.000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
