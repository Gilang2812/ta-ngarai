"use client";

import dayjs from "dayjs";
import TableManagementHeader from "../admin/TableManagementHeader";
import ManagementSkeletonLoader from "../loading/ManagementSkeletonLoader";
import useManageCraftTransaction from "@/hooks/useManageCraftTransaction";
import {
  getCraftTransactionStatus,
  getCraftTransactionStatusColor,
} from "@/utils/getCraftTransactionStatus";
import { formatPrice } from "@/lib/priceFormatter";
import { FaCheckCircle, FaInfoCircle, FaReply } from "react-icons/fa";
import TableHeaderManagement from "../admin/TableHeaderManagement";
import TransactionButtons from "./craftTransaction/TransactionButtons";
import { ProductContent } from "./craftTransaction/ProductContent";
import ManagementFooter from "../admin/ManagementFooter";
import ButtonTooltip from "../common/ButtonTooltip";
import Link from "next/link";
import { ModalDetail } from "../modal/ModalDetail";
import { UserDetailPage } from "../reservation/UserDetailPage";
import ReviewHistory from "../review/ReviewHistory";

const CraftTransaction = () => {
  const {
    transactionLoading,
    handleShipProducts,
    currentItems,
    currentPage,
    handleItemsPerPage,
    handleNextPage,
    handlePrevPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    searchTerm,
    handleSearch,
    isOpen,
    selectedTransaction,
    modalContent,
    handleTransactionClick,
    handleTransactionClose,
  } = useManageCraftTransaction();
  if (transactionLoading) return <ManagementSkeletonLoader />;

  const RenderTransaction = () => {
    return currentItems?.map((item, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-semibold ">
                {
                  item?.shippingItems?.[0]?.checkout?.shippingAddress
                    ?.addressCustomer?.fullname
                }
              </div>
              <div className="text-sm ">ID: # {item.shipping_id}</div>
            </div>
          </div>
        </td>
        <td>
          <div>
            {dayjs(item.shippingItems?.[0]?.checkout?.checkout_date).format(
              "DD MMMM YYYY"
            )}
          </div>
          <div className="text-sm ">
            {dayjs(item.shippingItems?.[0]?.checkout?.checkout_date).format(
              "HH:mm WIB"
            )}
          </div>
        </td>
        <td>
          <div>
            {item?.shippingItems
              .map(
                (product) =>
                  `${product.detailCraft.variant.craft.name} ${product?.detailCraft?.variant.name}`
              )
              .join(" + ")}
          </div>
          <div className="text-sm ">{item?.shippingItems?.length} items</div>
        </td>
        <td>
          <div className="font-semibold text-primary">
            {formatPrice(
              item.shippingItems.reduce(
                (acc, item) => acc + item?.detailCraft?.price * item?.jumlah,
                0
              )
            )}
          </div>
        </td>
        <td className="text-center">
          <span
            className={`px-3 py-1 ${getCraftTransactionStatusColor(
              item?.status,
              item.shippingItems[0].checkout.transaction_token,
              item.paymentStatus
            )} text-white text-center text-nowrap rounded-full text-sm font-medium`}
          >
            {getCraftTransactionStatus(
              item.status,
              item.shippingItems[0].checkout.transaction_token,
              item.paymentStatus
            )}
          </span>
        </td>
        <td>
          <div className="flex items-center gap-2 justify-center">
            <TransactionButtons
              handleShipProducts={() =>
                handleShipProducts({
                  content: (
                    <ProductContent
                      craft={item.shippingItems.map((item) => item)}
                    />
                  ),
                  checkout_id: item.shippingItems[0].checkout.id,
                  shipping_id: item.shipping_id,
                })
              }
              status={item.status}
              rated={item.shippingItems[0].review_text ? true : false}
            />

            <ButtonTooltip
              onClick={() => handleTransactionClick(item, "items")}
              label="Detail Pesanan"
              variant="primary"
            >
              <FaInfoCircle />
            </ButtonTooltip>
            {item.shippingItems.some(
              (craft) => craft.review_text && !craft.seller_response
            ) ? (
              <ButtonTooltip label="Reply" variant="edit" asChild>
                <Link
                  href={`/web/reservation/${item.shipping_id}/rating-items`}
                >
                  <FaReply />
                </Link>
              </ButtonTooltip>
            ) : (
              item.shippingItems.every(
                (craft) => craft.review_text && craft.seller_response
              ) && (
                <ButtonTooltip
                  label="Responded"
                  variant="edit"
                  className="p-2"
                  onClick={() => handleTransactionClick(item, "rate")}
                >
                  <FaCheckCircle />
                </ButtonTooltip>
              )
            )}
          </div>
        </td>
      </tr>
    ));
  };

  return (
    currentItems && (
      <section>
        <TableManagementHeader
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          handleItemsPerPage={handleItemsPerPage}
          itemsPerPage={itemsPerPage}
        />

        <table className="w-full border-collapse [&_tr]:border-b [&_tr]:border-gray-300 [&_td]:px-4 [&_td]:py-2">
          <TableHeaderManagement
            headers={["Pelanggan", "Tanggal", "Produk", "Total", "Status"]}
          />
          <tbody>
            <RenderTransaction />
          </tbody>
        </table>
        <ManagementFooter
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          totalItems={currentItems.length}
        />
        <ModalDetail
          isOpen={isOpen}
          onClose={handleTransactionClose}
          title="Detail Transaksi"
        >
          {selectedTransaction &&
            (modalContent === "items" ? (
              <UserDetailPage history={selectedTransaction} />
            ) : (
              modalContent === "rate" && (
                <ReviewHistory
                  shippingItems={selectedTransaction.shippingItems}
                />
              )
            ))}
        </ModalDetail>
      </section>
    )
  );
};

export default CraftTransaction;
