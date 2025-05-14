import { Address } from "@/type/schema/CheckoutSchema";
import { MapPin, Plus, Edit, Check } from "lucide-react";
import Button from "../common/Button";

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId: string;
  onSelectAddress: (addressId: string) => void;
  onAddNewAddress: () => void;
  onEditAddress: (address: Address) => void;
}

export const AddressSelector = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddNewAddress,
  onEditAddress,
}: AddressSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Select Address</h3>
        <Button onClick={onAddNewAddress}>
          <Plus className="w-4 h-4 mr-1" /> Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 cursor-pointer ${
              selectedAddressId === address.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onSelectAddress(address.id)}
          >
            <div className="flex justify-between">
              <div className="flex items-start">
                <div
                  className={`mt-1 mr-3 flex-shrink-0 ${
                    selectedAddressId === address.id
                      ? "text-blue-500"
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
                  <div className="font-medium">{address.name}</div>
                  <div className="text-sm text-gray-600">
                    {address.streetAddress}
                  </div>
                  <div className="text-sm text-gray-600">
                    {address.postalCode}
                  </div>
                  <div className="text-sm text-gray-600">{address.phone}</div>
                  <div className="text-sm text-gray-600">{address.email}</div>
                  {address.isDefault && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                      Default
                    </span>
                  )}
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
      </div>
    </div>
  );
};
