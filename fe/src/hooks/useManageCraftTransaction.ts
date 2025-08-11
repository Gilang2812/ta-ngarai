import { useFetchSouvenirTransaction } from "@/features/web/checkout/useFetchSouvenirTransaction";
import { getCraftTransactionStatus } from "@/utils/getCraftTransactionStatus";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useSearchTable from "./useSearchTable";
import useTableManagement from "./useTableManagement";
import { ShippingDataWithReviewGallery } from "@/type/schema/CraftTransactionSchema";
import { useUpdateStatus } from "@/features/web/checkout/useUpdateStatus";
import { cornerAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";

const useManageCraftTransaction = () => {
  const [modalContent, setModalContent] = useState<"items" | "rate">("items");
  const { isOpen, toggleModal } = useModal();
  const [selectedTransaction, setSelectedTransaction] =
    useState<ShippingDataWithReviewGallery | null>(null);

  const {
    data: transaction,
    isLoading: transactionLoading,
    refetch,
  } = useFetchSouvenirTransaction();

  const { mutateAsync: updateStatus, isPending: updatingStatus } =
    useUpdateStatus({
      onSuccess: () => {
        cornerAlert("Status updated successfully!");
        refetch();
      },
    });

  useEffect(() => {
    if (updatingStatus) {
      setTimeout(() => {
        showLoadingAlert();
      }, 0);
    }
  }, [updatingStatus]);

  const MySwal = withReactContent(Swal);
  const handleShipProducts = ({
    content,
    checkout_id,
    shipping_id,
  }: {
    content: JSX.Element;
    checkout_id: string;
    shipping_id: string;
  }) => {
    console.log(shipping_id);
    MySwal.fire({
      title: "Ship Products?",
      text: "Are you sure you want to ship these products?",
      icon: "warning",
      html: content,
      showCancelButton: true,
      confirmButtonText: "Yes, ship it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Handle the shipping logic here
        await updateStatus({
          id: checkout_id,
          status: 3,
          shippings: [shipping_id],
        });
      }
    });
  };

  const { searchTerm, handleSearch } = useSearchTable();

  const filteredData = useMemo(() => {
    return (
      transaction?.filter((item) => {
        const searchable = {
          id: item?.shippingItems?.[0]?.checkout?.id,
          fullname:
            item?.shippingItems?.[0]?.checkout?.shippingAddress?.addressCustomer
              ?.fullname,
          date: item?.shippingItems?.[0]?.checkout?.checkout_date,
          status: getCraftTransactionStatus(
            item.status,
            item.shippingItems[0].checkout.transaction_token,
            item.paymentStatus
          ),
          craft_name: item?.shippingItems
            ?.map(
              (item) =>
                `${item.detailCraft.variant.craft.name} ${item.detailCraft.variant.name}`
            )
            .join(", "),
        };

        return Object.keys(searchable).some((key) =>
          searchable[key as keyof typeof searchable]
            ?.toString()
            .trim() // hapus spasi di awal/akhir value
            .toLowerCase()
            .includes(searchTerm)
        );
      }) || []
    );
  }, [searchTerm, transaction]);

  const handleTransactionClick = (
    item: ShippingDataWithReviewGallery,
    content: "items" | "rate"
  ) => {
    setModalContent(content);
    setSelectedTransaction(item);
    toggleModal();
  };

  const handleTransactionClose = () => {
    setSelectedTransaction(null);
    toggleModal();
  };

  const {
    currentItems,
    currentPage,
    handleItemsPerPage,
    handleNextPage,
    handlePrevPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
  } = useTableManagement<ShippingDataWithReviewGallery>(filteredData);

  return {
    transaction,
    isOpen,
    selectedTransaction,
    handleTransactionClick,
    handleTransactionClose,
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
    modalContent,
  };
};

export default useManageCraftTransaction;
