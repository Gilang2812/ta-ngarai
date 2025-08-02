import { Home, MapPin, Plus } from "lucide-react";
import React from "react";
import Button from "../common/Button";

const EmptyAddress = ({ onAdd = () => {} }: { onAdd?: () => void }) => {
  const addressTypes = [
    { icon: Home, label: "Home", description: "Your residential address" },
    { icon: MapPin, label: "Work", description: "Your office or workplace" },
    { icon: MapPin, label: "Other", description: "Frequently visited places" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold ">Address</h2>
        <Button onClick={onAdd} variant="primary">
          <Plus className="w-4 h-4" />
          Add New Address
        </Button>
      </div>

      {/* Empty State with Suggestions */}
      <div className="text-center mb-8">
        <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <MapPin className="w-8 h-8 " />
        </div>

        <h3 className="text-lg font-medium  mb-2">Add your addresses</h3>

        <p className=" mb-6">
          Save time by adding your frequently used addresses
        </p>
      </div>

      {/* Address Type Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {addressTypes.map((type, index) => {
          const IconComponent = type.icon;
          return (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 text-left group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center">
                  <IconComponent className="w-4 h-4  group-hover:text-primary" />
                </div>
                <span className="font-medium ">{type.label}</span>
              </div>
              <p className="text-sm ">{type.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmptyAddress;
