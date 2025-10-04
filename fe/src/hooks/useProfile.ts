import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useModal } from "@/utils/ModalUtils";
import { useFetchAddress } from "@/features/web/address/useFetchAddress";
import { useCreateAddress } from "@/features/web/address/useCreateAddress";
import { useUpdateAddress } from "@/features/web/address/useUpdateAddress";
import { cornerAlert } from "@/utils/AlertUtils";
import { Address } from "@/type/schema/CheckoutSchema";
import { formatAddress } from "@/lib/formatAddress";

const useProfile = () => {
  const { user } = useAuth();
  const { isOpen, toggleModal } = useModal();
  const { data: addresses, isLoading, refetch } = useFetchAddress();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(
    undefined
  );

  const profile: {
    label: "fullname" | "username" | "email" | "address" | "phone";
    values: string | undefined;
    isEmpty: boolean;
  }[] = [
    {
      label: "fullname",
      values: user?.name || "Set your full name",
      isEmpty: !user?.name,
    },
    {
      label: "username",
      values: user?.username || "Set your username",
      isEmpty: !user?.username,
    },
    {
      label: "email",
      values: user?.email || "Set your email address",
      isEmpty: !user?.email,
    },
    {
      label: "address",
      values: selectedAddress
        ? formatAddress(selectedAddress)
        : "Add your first address",
      isEmpty: !selectedAddress,
    },
    {
      label: "phone",
      values: user?.phone || "Add your phone number",
      isEmpty: !user?.phone,
    },
  ];

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

  // Mutations
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

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const firstPrimary = addresses.find((address) => address.is_primary);
      setSelectedAddress(firstPrimary || addresses[0]);
    }
  }, [addresses]);

  // Handlers
  const handleSaveAddress = (values: Address) => {
    if (editingAddress) {
      updateAddress(values);
    } else {
      createAddress(values);
    }
  };

  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddress(undefined);
  };

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

  return {
    profile,
    isLoading,
    addresses,
    isOpen,
    toggleModal,
    addressInitialValues,
    showAddressForm,
    setShowAddressForm,
    selectedAddress,
    setSelectedAddress,
    editingAddress,
    setEditingAddress,
    isPending: creating || updating,
    handleSaveAddress,
    handleCancelAddressForm,
    handleSelectAddress,
    handleAddNewAddress,
    handleEditAddress,
  };
};

export default useProfile;
