export type PaymentDetails = {
  order_id: string;
  total_pembayaran: number;
  waktu_transaksi: string;
  expire: string;
  status: string;
  payment_type: string;
  virtual_account?: string[];
  token: string;
  shippings?: number[]
};
