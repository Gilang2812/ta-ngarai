import { InfoGrid } from "./InfoGrid";
import { StatusBadge } from "./StatusBadge";

  const transactions = [
    {
      id: 'TRX-2025-001',
      date: '2 Juni 2025, 14:30',
      status: 'confirmed',
      statusText: 'Dikonfirmasi',
      user: 'john.doe@email.com',
      total: 'Rp 4.675.000',
      payment: 'Transfer Bank BCA',
      products: [
        {
          name: 'Smartphone Samsung A54',
          store: 'ElektroMart',
          details: '8GB/256GB, Warna Hitam',
          qty: 1,
          price: 'Rp 4.500.000'
        },
        {
          name: 'Case & Screen Protector',
          store: 'ElektroMart',
          details: 'Case Silikon + Tempered Glass',
          qty: 1,
          price: 'Rp 150.000'
        }
      ],
      shipping: {
        courier: 'JNE Regular',
        cost: 'Rp 25.000',
        estimate: '2-3 hari',
        resi: 'JNE123456789'
      }
    },
    {
      id: 'TRX-2025-002',
      date: '1 Juni 2025, 09:15',
      status: 'shipped',
      statusText: 'Dikirim',
      user: 'maria.sari@email.com',
      total: 'Rp 1.010.000',
      payment: 'OVO',
      products: [
        {
          name: 'Kaos Polos Premium',
          store: 'FashionHub',
          details: 'Cotton Combed 30s',
          qty: 3,
          price: 'Rp 225.000'
        },
        {
          name: 'Sepatu Sneakers',
          store: 'ShoeWorld',
          details: 'Size 42, Warna Putih',
          qty: 1,
          price: 'Rp 750.000'
        }
      ],
      shipping: {
        multiple: true,
        details: [
          { store: 'FashionHub', courier: 'SiCepat', cost: 'Rp 15.000' },
          { store: 'ShoeWorld', courier: 'J&T Express', cost: 'Rp 20.000' }
        ]
      }
    },
    {
      id: 'TRX-2025-003',
      date: '2 Juni 2025, 16:45',
      status: 'paid',
      statusText: 'Menunggu Konfirmasi',
      user: 'budi.santoso@email.com',
      total: 'Rp 20.575.000',
      payment: 'Transfer Bank Mandiri',
      products: [
        {
          name: 'Laptop Gaming ASUS ROG',
          store: 'TechStore',
          details: 'Intel i7, RTX 3060, 16GB RAM',
          qty: 1,
          price: 'Rp 18.500.000'
        },
        {
          name: 'Mouse Gaming Logitech',
          store: 'GamingZone',
          details: 'G502 Hero',
          qty: 1,
          price: 'Rp 800.000'
        },
        {
          name: 'Mechanical Keyboard',
          store: 'GamingZone',
          details: 'Cherry MX Blue',
          qty: 1,
          price: 'Rp 1.200.000'
        }
      ],
      shipping: {
        multiple: true,
        details: [
          { store: 'TechStore', courier: 'JNE Cargo', cost: 'Rp 50.000' },
          { store: 'GamingZone', courier: 'SiCepat Regular', cost: 'Rp 25.000' }
        ]
      }
    }
  ];

export const AdminViewPage = () => (
  
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h2 className="text-2xl font-bold mb-6" style={{ color: "#435ebe" }}>
      Panel Admin - Semua Transaksi
    </h2>
    {transactions.map((transaction) => (
      <div
        key={transaction.id}
        className="bg-white border border-gray-200 rounded-xl p-6 mb-4 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div>
            <div
              className="font-semibold text-lg mb-1"
              style={{ color: "#435ebe" }}
            >
              {transaction.id}
            </div>
            <div className="text-sm text-gray-600">
              User: {transaction.user}
            </div>
          </div>
          <StatusBadge
            status={transaction.status as "confirmed" | "shipped" | "paid"}
            text={transaction.statusText}
          />
        </div>

        <InfoGrid
          items={[
            { label: "Total Transaksi", value: transaction.total },
            {
              label: "Jumlah Item",
              value: `${transaction.products.length} produk`,
            },
            { label: "Pembayaran", value: transaction.payment },
            { label: "Tanggal", value: transaction.date.split(",")[0] },
          ]}
        />

        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: "#435ebe" }}
          >
            Kelola Transaksi
          </button>
          <button
            className="px-4 py-2 border-2 font-semibold rounded-lg transition-all duration-300"
            style={{ borderColor: "#435ebe", color: "#435ebe" }}
          >
            Lihat Detail Lengkap
          </button>
        </div>
      </div>
    ))}
  </div>
);
