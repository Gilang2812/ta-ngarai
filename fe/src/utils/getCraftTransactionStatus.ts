export const getCraftTransactionStatus = (status: number) => {
  switch (status) {
    case 0:
      return "Not ordered yet";
    case 1:
      return "Awaiting payment";
    case 2:
      return "Processing your order";
    case 3:
      return "On the way";
    case 4:
      return "Completed";
    case 5:
      return "Thank you for your rating!";
    case 6:
      return "Order cancelled";
    default:
      return "Unknown status";
  }
};

export const getCraftTransactionStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return "bg-gray-500";
    case 1:
      return "bg-yellow-400";
    case 2:
      return "bg-primary";
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
};
