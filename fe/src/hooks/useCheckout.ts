import { useCreateAddress } from "@/features/web/address/useCreateAddress";
import { useUpdateAddress } from "@/features/web/address/useUpdateAddress";
import { useGetUserCheckout } from "@/features/web/checkout/useGetUserCheckout";
import { CheckoutItem, type Address } from "@/types/schema/CheckoutSchema";
import { CourierPricing } from "@/types/schema/ShippingSchema";
import { cornerAlert } from "@/utils/AlertUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PaymentMethod = "cod" | "bank" | "apar";

export const useCheckout = () => {
  const router = useRouter();
  const [itemShipping, setItemShipping] = useState<CourierPricing[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(
    undefined
  );

  const [shippingMethods, setShippingMethods] = useState<CourierPricing[]>([]);
  const {
    data: checkout,
    isLoading: checkoutLoading,
    refetch,
    error,
  } = useGetUserCheckout();
  const addressList = checkout?.shippingAddress.addressCustomer.addresses;
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(
    addressList?.find((addr) => addr.is_primary) ||
      addressList?.[0] ||
      undefined
  );

  useEffect(() => {
    if (addressList) {
      setSelectedAddress(addressList[0]);
    }
  }, [addressList]);
  useEffect(() => {
    if (error?.status === 404) {
      router.push("/web/craft");
    }
  }, [error, router]);

  const { mutate: createAddress, isPending: creating } = useCreateAddress({
    onSuccess: () => {
      cornerAlert("Address saved successfully");
      setShowAddressForm(false);
      setEditingAddress(undefined);
      refetch();
    },
  });
  const { mutate: updateAddress, isPending: updating } = useUpdateAddress({
    onSuccess: () => {
      cornerAlert("Address updated successfully");
      setShowAddressForm(false);
      setEditingAddress(undefined);
      refetch();
    },
  });

  const addressInitialValues = {
    address_id: editingAddress?.address_id || "",
    customer_id: editingAddress?.customer_id || "",
    destination_id: editingAddress?.destination_id || "",
    label: editingAddress?.label || "",
    street: editingAddress?.street || "",
    recipient_name: editingAddress?.recipient_name || "",
    recipient_phone: editingAddress?.recipient_phone || "",
    negara: editingAddress?.negara || "",
    provinsi: editingAddress?.provinsi || "",
    kota: editingAddress?.kota || "",
    kecamatan: editingAddress?.kecamatan || "",
    kelurahan: editingAddress?.kelurahan || "",
    kode_pos: editingAddress?.kode_pos || "",
    details:
      editingAddress?.details ||
      Object.values(editingAddress || {})
        .slice(3, -1)
        .join(", ") ||
      "",
    is_primary: editingAddress?.is_primary || 0,
  };

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [orderNotes, setOrderNotes] = useState("");

  const [groupedItems, setGroupedItems] = useState<CheckoutItem[][]>([]);
  useEffect(() => {
    if (!checkout || !checkout.items) return;
    setGroupedItems(
      Object.values(
        checkout?.items.reduce((acc, item) => {
          const key = item.id_souvenir_place;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item);
          return acc;
        }, {} as Record<string, CheckoutItem[]>)
      )
    );
  }, [checkout]);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(undefined);
    setShowAddressForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);

    setShowAddressForm(true);
  };

  const handleSaveAddress = (values: Address) => {
    if (editingAddress) {
      updateAddress(values);
    } else {
      // Add new address
      createAddress(values);
    }
  };

  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddress(undefined);
  };

  const handleSubmitOrder = () => {
    alert("Order placed successfully!");
  };

  return {
    checkout,
    checkoutLoading,
    handleSubmitOrder,
    addressList,
    selectedAddress,
    showAddressForm,
    editingAddress,
    handleSelectAddress,
    handleAddNewAddress,
    handleEditAddress,
    handleSaveAddress,
    handleCancelAddressForm,
    paymentMethod,
    setPaymentMethod,
    orderNotes,
    setOrderNotes,
    mutate: handleSubmitOrder,
    addressInitialValues,
    isPending: creating || updating,
    shippingMethods,
    itemShipping,
    setItemShipping,
    setShippingMethods,
    groupedItems,
  };
};
