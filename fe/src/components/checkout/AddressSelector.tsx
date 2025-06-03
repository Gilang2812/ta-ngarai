import { Address } from "@/type/schema/CheckoutSchema";
import { motion } from "framer-motion";
import { Check, Edit, MapPin, Plus } from "lucide-react";
import React from "react";
import Button from "../common/Button";

type Props = {
  addresses: Address[];
  selectedAddressId: string;
  onSelectAddress: (address: Address) => void;
  onAddNewAddress: () => void;
  onEditAddress: (address: Address) => void;
  onAddressFormClose?: () => void;
};

const AddressSelector = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onEditAddress,
  onAddNewAddress,
}: Props) => {
  return (
    <motion.div layoutId="formAddress" className="grid grid-cols-1 gap-3">
      <header className="flex items-center justify-end">
        <Button variant={"primary"} onClick={onAddNewAddress}>
          <Plus className="w-4 h-4 mr-1" /> Add New Address
        </Button>
      </header>
      {addresses.map((address) => (
        <div
          key={address.id}
          className={`border  rounded-lg p-4   cursor-pointer ${
            selectedAddressId === address.id
              ? "border-primary bg-primary/5  "
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => onSelectAddress(address)}
        >
          <div className="flex justify-between">
            <div className="flex items-start">
              <div
                className={`mt-1 mr-3 flex-shrink-0 ${
                  selectedAddressId === address.id
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              >
                {selectedAddressId === address.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <MapPin className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="text-xs capitalize text-justify pr-2">
                  <p>{Object.values(address).slice(3,-1).join(", ").toLowerCase()}</p>
                </div>
                {address.is_primary ? (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                    Default
                  </span>
                ) : null}
              </div>
            </div>
            <Button
              className="h-8 px-2"
              onClick={(e) => {
                e.stopPropagation();
                onEditAddress(address);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default AddressSelector;
