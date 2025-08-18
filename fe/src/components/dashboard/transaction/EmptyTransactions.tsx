import Button from "@/components/common/Button";
import { Receipt, RefreshCw } from "lucide-react";

const EmptyTransactions = ({ onRefresh = () => {} }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
          <Receipt className="w-10 h-10 text-gray-400" />
        </div>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No transactions available
        </h3>
        <p className="text-gray-500 max-w-md">
          There are currently no user transactions to display. Transactions will
          appear here once users start making reservations.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onRefresh}>
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </Button>
      </div>
    </div>
  );
};
export default EmptyTransactions;
