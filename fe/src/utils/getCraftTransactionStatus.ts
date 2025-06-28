export const getCraftTransactionStatus = (status: number) => {
  switch (status) {
    case 0:
      return "belum dipesan";
    case 1:
      return "menunggu pembayaran";
    case 2:
      return "sedang diproses";
    case 3:
      return "dikirim";
    case 4:
      return "done";
    case 5:
      return "Rated";
    case 6:
      return "dibatalkan";
    default:
      return "status tidak diketahui";
  }
}

export const getCraftTransactionStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return "bg-gray-500";
    case 1:
      return "bg-yellow-400";
    case 2:
      return "bg-blue-500";
    case 3:
      return "bg-green-500";
    case 4:
      return "bg-purple-500";
    case 5:
      return "bg-purple-500";
    case 6:
      return "bg-red-600";
    default:
      return "bg-gray-500";
  }
}