import React from "react";
import HistoryList from "./HistoryList";
import { useCraftTransaction } from "@/hooks/useCraftTransaction";
import ManagementSkeletonLoader from "../loading/ManagementSkeletonLoader";
import { motion } from "framer-motion";
import { ModalDetail } from "../modal/ModalDetail";
import { UserDetailPage } from "./UserDetailPage";
import Link from "next/link";
import Button from "../common/Button";
import ReviewHistory from "../review/ReviewHistory";

const CraftTransaction = () => {
  const {
    userHistory,
    isLoading,
    handleHistoryClick,
    handleHistoryClose,
    isOpen,
    selectedHistory,
    handleReOrder,
    handleCompleteOrder,
    modalContent,
    handleRateClick,
  } = useCraftTransaction();
  if (isLoading) return <ManagementSkeletonLoader />;
  if (!userHistory || userHistory.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-5">
        <p className="text-center text-gray-500">
          No transaction history found.
        </p>
        <div className="flex justify-center items-center mt-4 space-y-4">
          <Button className="w-fit" asChild>
            <Link href="./craft">Mulai Belanja</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    userHistory && (
      <motion.section
        layoutId="reservation-list"
        className="min-h-screen bg-gray-50 rounded"
      >
        <div className="max-w-7xl mx-auto p-5">
          {userHistory.map((item) => (
            <HistoryList
              onClick={() => handleHistoryClick(item)}
              history={item}
              key={item.shipping_id}
              handleReOrder={handleReOrder}
              handleCompleteOrder={handleCompleteOrder}
              handleRateClick={() => handleRateClick(item)}
            />
          ))}
        </div>

        <ModalDetail
          isOpen={isOpen}
          onClose={handleHistoryClose}
          title="Detail Transaksi"
        >
          {selectedHistory &&
            (modalContent === "items" ? (
              <UserDetailPage history={selectedHistory} />
            ) : (
              modalContent === "rate" && (
                <ReviewHistory shippingItems={selectedHistory.shippingItems} />
              )
            ))}
        </ModalDetail>
      </motion.section>
    )
  );
};

export default CraftTransaction;
