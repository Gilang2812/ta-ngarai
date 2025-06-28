import { useFetchUserHistory } from "@/features/web/checkout/useFetchUserHistory";
import { useUpdateStatus } from "@/features/web/checkout/useUpdateStatus";
import { useBulkCreateCraftCart } from "@/features/web/craftCart/useBulkCreateCraftCart";
import { CraftCartForm } from "@/type/schema/CraftCartSchema";
import { ShippingData } from "@/type/schema/CraftTransactionSchema";
import {
  confirmAlert,
  cornerAlert,
  hideLoadingAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export const useCraftTransaction = () => {
  const { isOpen, toggleModal } = useModal();
  const router = useRouter();
  const { data: userHistory, isLoading, refetch } = useFetchUserHistory();
  const [selectedHistory, setSelectedHistory] = useState<ShippingData | null>(
    null
  );

  const [modalContent, setModalContent] = useState<"items" | "rate">("items");

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

  const handleHistoryClick = (history: ShippingData) => {
    setModalContent("items");
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
    return () => {
      hideLoadingAlert();
    };
  }, [isPending, isUpdating]);

  const handleReOrder = (items: CraftCartForm[]) => {
    createCraftCart({ items });
  };

  const handleCompleteOrder = (orderId: string) => {
    confirmAlert(
      "Finish Order",
      "Are you sure you want to finish this order?",
      () => {
        updateStatus({ id: orderId, status: 4 });
      }
    );
  };

  const handleRateClick =(history: ShippingData) => {
    setModalContent("rate");
    setSelectedHistory(history);
    toggleModal();
  }
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
    handleRateClick,
  };
};
