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
import { FaInfoCircle, FaReply } from "react-icons/fa";
import TableHeaderManagement from "../admin/TableHeaderManagement";
import TransactionButtons from "./craftTransaction/TransactionButtons";
import { ProductContent } from "./craftTransaction/ProductContent";
import ManagementFooter from "../admin/ManagementFooter";
import ButtonTooltip from "../common/ButtonTooltip";
import Link from "next/link";

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
    clearSearchTerm,
    handleSearch,
  } = useManageCraftTransaction();
  if (transactionLoading) return <ManagementSkeletonLoader />;

  const RenderTransaction = () => {
    return currentItems?.map((item, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-semibold text-gray-900">
                {
                  item?.shippingItems?.[0]?.checkout?.shippingAddress
                    ?.addressCustomer?.fullname
                }
              </div>
              <div className="text-sm text-gray-500">
                ID: # {item.shipping_id}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="text-gray-900">
            {dayjs(item.shippingItems?.[0]?.checkout?.checkout_date).format(
              "DD MMMM YYYY"
            )}
          </div>
          <div className="text-sm text-gray-500">
            {dayjs(item.shippingItems?.[0]?.checkout?.checkout_date).format(
              "HH:mm WIB"
            )}
          </div>
        </td>
        <td>
          <div className="text-gray-900">
            {item?.shippingItems
              .map(
                (product) =>
                  `${product.detailCraft.variant.craft.name} ${product?.detailCraft?.variant.name}`
              )
              .join(" + ")}
          </div>
          <div className="text-sm text-gray-500">
            {item?.shippingItems?.length} items
          </div>
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
              item?.status
            )} text-white text-center rounded-full text-sm font-medium`}
          >
            {getCraftTransactionStatus(item.status)}
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
                  shipping_id: parseInt(item.shipping_id),
                })
              }
              status={item.status}
            />
            <ButtonTooltip label="Detail Pesanan" variant="primary">
              <FaInfoCircle />
            </ButtonTooltip>
            {item.shippingItems.some(
              (craft) => craft.review_text && !craft.seller_response
            ) && (
              <ButtonTooltip label="Reply" variant="edit" asChild>
                <Link
                  href={`/web/reservation/${item.shipping_id}/rating-items`}
                >
                  <FaReply />
                </Link>
              </ButtonTooltip>
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
          clearSearchTerm={clearSearchTerm}
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          handleItemsPerPage={handleItemsPerPage}
          itemsPerPage={itemsPerPage}
        />

        <table className="w-full border-collapse [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2">
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
      </section>
    )
  );
};

export default CraftTransaction;
