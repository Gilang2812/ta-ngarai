import React from "react";
import HistoryList from "./HistoryList";
import { useCraftTransaction } from "@/hooks/useCraftTransaction";
import ManagementSkeletonLoader from "../loading/ManagementSkeletonLoader";
import { ModalDetail } from "../modal/ModalDetail";
import { UserDetailPage } from "./UserDetailPage";
import Link from "next/link";
import Button from "../common/Button";
import ReviewHistory from "../review/ReviewHistory";
import TableManagementHeader from "../admin/TableManagementHeader";
import ManagementFooter from "../admin/ManagementFooter";

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
    handleSearch,
    searchTerm,
    handleNextPage,
    handlePrevPage,
    handleItemsPerPage,
    currentItems,
    currentPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems,
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
      <section className="min-h-screen bg-gray-50 rounded">
        <div className="max-w-7xl mx-auto p-5">
          <TableManagementHeader
            handleItemsPerPage={handleItemsPerPage}
            handleSearch={handleSearch}
            itemsPerPage={itemsPerPage}
            searchTerm={searchTerm}
          />
        </div>
        <div className="max-w-7xl mx-auto p-5">
          {currentItems.map((item) => (
            <HistoryList
              onClick={() => handleHistoryClick(item, "items")}
              history={item}
              key={item.shipping_id}
              handleReOrder={handleReOrder}
              handleCompleteOrder={handleCompleteOrder}
              handleRateClick={() => handleHistoryClick(item, "rate")}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto p-5">
          <ManagementFooter
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
            totalItems={totalItems}
            totalPages={totalPages}
          />
        </div>
        <ModalDetail
          isOpen={isOpen}
          onClose={handleHistoryClose}
          title="Detail Transaksi"
        >
          {selectedHistory &&
            (modalContent === "items" ? (
              <UserDetailPage history={selectedHistory} />
            ) : modalContent === "rate" ? (
              <ReviewHistory shippingItems={selectedHistory.shippingItems} />
            ) : (
              modalContent === "tracking" && <>hello world</>
            ))}
        </ModalDetail>
      </section>
    )
  );
};

export default CraftTransaction;
