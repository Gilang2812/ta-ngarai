import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";

const PaymentTransaction = () => {
  return (
    <SingleContentWrapper>
      <div className="border-l-4 border-primary pl-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Detail Pesanan</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Order ID
              </label>
              <p className="text-lg font-semibold text-gray-900">test000002</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Total Pembayaran
              </label>
              <p className="text-lg font-semibold text-gray-900">Rp358.250</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Status
              </label>
              <div className="mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Kadaluarsa
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Waktu Transaksi
              </label>
              <p className="text-sm text-gray-900">10 Juni 2025 16.06</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Waktu Kadaluarsa
              </label>
              <p className="text-sm text-gray-900">11 Juni 2025 16.06</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nomor Virtual Account
          </h3>
          <div className="bg-gray-50 rounded-lg p -4 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">🏦 BNI</p>
                <p className="text-xl font-mono font-bold text-primary mt-1">
                  9884789075168537
                </p>
              </div>
              <button className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                Copy
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-2">
              ⚠️ Transaksi Kadaluarsa
            </h4>
            <p className="text-sm text-red-800">
              Virtual account ini sudah tidak dapat digunakan karena melewati
              batas waktu pembayaran. Silakan lakukan pemesanan ulang.
            </p>
          </div>
        </div>
      </div>
    </SingleContentWrapper>
  );
};

export default PaymentTransaction;
