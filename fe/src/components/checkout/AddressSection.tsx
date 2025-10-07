import { Address, addressFormSchema } from "@/types/schema/CheckoutSchema";
import Button from "../common/Button";
import { FaEdit } from "react-icons/fa";
import AddressSelector from "./AddressSelector";
import { AddressForm } from "./AddressForm";
import { useModal } from "@/utils/ModalUtils";
import { Formik } from "formik";
import { InfoModal } from "../modal/InfoModal";

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddress: Address;
  onSelectAddress: (address: Address) => void;
  onAddNewAddress: () => void;
  onEditAddress: (address: Address) => void;
  showAddressForm: boolean;
  handleSaveAddress: (values: Address) => void;
  handleCancelAddressForm: () => void;
  editingAddress?: Address;
  addressInitialValues: Address;
  isPending?: boolean;
}

export const AddressSection = ({
  addresses,
  selectedAddress,
  onSelectAddress,
  onAddNewAddress,
  onEditAddress,
  showAddressForm,
  addressInitialValues,
  handleSaveAddress,
  handleCancelAddressForm,
  isPending,
}: AddressSelectorProps) => {
  const { isOpen, toggleModal } = useModal();
  const userAddress = Object.values(selectedAddress).slice(3, -1).join(", ");

  return (
    <div className="space-y-2">
      <header className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold"> Address</h3>
      </header>

      <div
        onClick={() => {
          toggleModal();
          handleCancelAddressForm();
        }}
        className="relative cursor-pointer font-normal p-4 pr-10 rounded  bg-gray-50  border "
      >
        <Button
          variant={"secondary"}
          className="bg-white text-slate-500 border-slate-500  right-2 top-2 border p-1 absolute "
          type="button"
        >
          <FaEdit />
        </Button>
        <p className="text-sm capitalize text-justify">
          {userAddress.toLowerCase()}{" "}
        </p>
      </div>
      <InfoModal title="address" isOpen={isOpen} onClose={toggleModal}>
        {addresses && showAddressForm ? (
          <Formik
            initialValues={addressInitialValues}
            enableReinitialize
            onSubmit={handleSaveAddress}
            validationSchema={addressFormSchema}
          >
            <AddressForm
              onSave={handleSaveAddress}
              addressInitialValues={addressInitialValues}
              onCancel={handleCancelAddressForm}
              isPending={isPending}
            />
          </Formik>
        ) : (
          <AddressSelector
            addresses={addresses}
            onAddNewAddress={onAddNewAddress}
            onEditAddress={onEditAddress}
            selectedAddressId={selectedAddress.address_id}
            onSelectAddress={onSelectAddress}
          />
        )}
      </InfoModal>
    </div>
  );
};
