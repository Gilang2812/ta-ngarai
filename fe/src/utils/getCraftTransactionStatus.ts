export const getCraftTransactionStatus = (status: number, token?: string) => {
  switch (status) {
    case 0:
      return "Not ordered";
    case 1:
      return "Awaiting payment";
    case 2:
      return "Processing";
    case 3:
      return "Shipped";
    case 4:
      return "Completed";
    case 5:
      return "Rated";
    case 6:
      return !token ? "cancel" : "Awaiting payment";
    default:
      return "Unknown";
  }
};

export const getCraftTransactionStatusColor = (
  status: number,
  token?: string
) => {
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
      return !token ? "bg-red-600" : "bg-yellow-400";
    default:
      return "bg-gray-500";
  }
};
