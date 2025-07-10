const PaymentStatus = ({ status }: { status: string }) => {
  switch (status) {
    case "success":
      return (
        <p className="font-medium text-green-700 mb-2">
          ✅ Transaction successful
        </p>
      );
    case "pending":
      return (
        <p className="font-medium text-yellow-600 mb-2">
          ⏳ Waiting for payment
        </p>
      );
    case "challenge":
      return (
        <p className="font-medium text-orange-600 mb-2">
          ⚠️ Transaction under review
        </p>
      );
    case "deny":
      return (
        <p className="font-medium text-red-800 mb-2">❌ Transaction denied</p>
      );
    case "failure":
      return (
        <p className="font-medium text-red-900 mb-2">❌ Transaction failed</p>
      );
    case "expire":
      return (
        <p className="font-medium text-red-900 mb-2">⚠️ Transaction expired</p>
      );
    default:
      return (
        <p className="font-medium text-gray-700 mb-2">
          ℹ️ Unknown transaction status
        </p>
      );
  }
};

export default PaymentStatus;
