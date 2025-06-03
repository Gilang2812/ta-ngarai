type Props = {
  status: "paid" | "confirmed" | "shipped" | "delivered";
  text: string;
};
const getStatusColor = (status) => {
  switch (status) {
    case "paid":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-green-100 text-green-800";
  }
};

export const StatusBadge = ({ status, text }: Props) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(
      status
    )}`}
  >
    {text}
  </span>
);
