import { useFetchUserHistory } from "@/features/web/checkout/useFetchUserHistory";
import { useUpdateStatus } from "@/features/web/checkout/useUpdateStatus";
import { useBulkCreateCraftCart } from "@/features/web/craftCart/useBulkCreateCraftCart";
import { CraftCartForm } from "@/types/schema/CraftCartSchema";
import { ShippingDataWithReviewGallery } from "@/types/schema/CraftTransactionSchema";
import {
  confirmAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useSearchTable from "./useSearchTable";
import dayjs from "dayjs";
import useTableManagement from "./useTableManagement";
export const useCraftTransaction = () => {
  const { isOpen, toggleModal } = useModal();
  const router = useRouter();
  const { data: userHistory, isLoading, refetch } = useFetchUserHistory();
  const [selectedHistory, setSelectedHistory] =
    useState<ShippingDataWithReviewGallery | null>(null);

  const [modalContent, setModalContent] = useState<
    "items" | "rate" | "tracking"
  >("items");

  const { mutate: updateStatus, isPending: isUpdating } = useUpdateStatus({
    onSuccess: () => {
      refetch();
      cornerAlert("Status updated successfully!");
    },
  });

  const { mutate: createCraftCart, isPending } = useBulkCreateCraftCart({
    onSuccess: () => {
      cornerAlert("Craft cart created successfully!");
      router.push("/web/cart?tab=craft");
    },
  });

  const { handleSearch, searchTerm } = useSearchTable();
  const filteredData = useMemo(() => {
    return (
      userHistory?.filter((item) => {
        const requestBody = {
          tanggal: dayjs(
            item.shippingItems?.[0]?.checkout?.checkout_date
          ).format("DD MMMM YYYY"),
          produk: item.shippingItems
            ?.map(
              (shippingItem) =>
                `${shippingItem?.detailCraft?.variant?.craft?.name} ${shippingItem?.detailCraft?.variant?.name}`
            )
            .join(", "),
          store:
            item.shippingItems?.[0]?.detailCraft?.souvenirPlace?.name ?? "",
          total: item.shippingItems?.[0]?.checkout?.total_price ?? 0,
        };
        return Object.values(requestBody).some((value) =>
          value
            .toString()
            .toLowerCase()
            .trim()
            .includes(searchTerm.toLowerCase().trim())
        );
      }) || []
    );
  }, [userHistory, searchTerm]);

  const {
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
  } = useTableManagement(filteredData);
  const handleHistoryClick = (
    history: ShippingDataWithReviewGallery,
    content: "items" | "rate"
  ) => {
    setModalContent(content);
    setSelectedHistory(history);
    toggleModal();
  };

  const handleHistoryClose = () => {
    toggleModal();
    setTimeout(() => {
      setSelectedHistory(null);
    }, 300);
  };

  useEffect(() => {
    if (isPending || isUpdating) {
      showLoadingAlert();
    }
  }, [isPending, isUpdating]);

  const handleReOrder = (items: CraftCartForm[]) => {
    createCraftCart({ items });
  };

  const handleCompleteOrder = (orderId: string, shipping_id: string) => {
    confirmAlert(
      "Finish Order",
      "Are you sure you have received your order?",
      () => {
        updateStatus({ id: orderId, status: 4, shippings: [shipping_id] });
      }
    );
  };

  return {
    userHistory,
    isLoading,
    isOpen: isOpen && !!selectedHistory,
    toggleModal,
    selectedHistory,
    handleHistoryClick,
    handleHistoryClose,
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
  };
};
