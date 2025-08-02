import React from "react";
import {
  ChevronDown,
  X,
  ShoppingCart,
  User,
  Calendar,
  Clock,
  Users,
  MessageCircle,
} from "lucide-react";

export default function HomestayReservationSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-600 text-white">
            <X size={20} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Nagari Koto Gadang
            </h1>
            <p className="text-sm text-gray-600">Tourism Village</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2">
            <ShoppingCart size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full bg-blue-500 text-white">
            <User size={20} />
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white px-4 py-6">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="text-xs text-blue-600 mt-1">step 1</span>
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-xs text-gray-500 mt-1">step 2</span>
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="text-xs text-gray-500 mt-1">step 3</span>
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </div>
            <span className="text-xs text-gray-500 mt-1">final</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        {/* Main Content Container */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Reservation Form */}
          <div className="space-y-6">
            {/* Homestay Reservation Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-blue-600 text-white px-4 py-3">
                <h2 className="text-lg font-medium">Homestay Reservation</h2>
              </div>

              {/* Weather Section */}
              <div className="p-4 border-b">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Weather prediction for the Next 14 days
                </h3>
                <div className="flex space-x-4 overflow-x-auto">
                  <div className="flex-shrink-0 text-center">
                    <div className="text-xs text-gray-600 mb-2">2025-08-06</div>
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-gray-400 rounded"></div>
                    </div>
                    <div className="text-xs">
                      <div className="text-gray-600">Min: 18.8</div>
                      <div className="text-gray-600">Max: 26.2</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-center">
                    <div className="text-xs text-gray-600 mb-2">2025-08-07</div>
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-gray-400 rounded"></div>
                    </div>
                    <div className="text-xs">
                      <div className="text-gray-600">Min: 18.2</div>
                      <div className="text-gray-600">Max: 22.8</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reservation Form */}
              <div className="p-4 space-y-4">
                {/* Unable Reservation Dates */}
                <div>
                  <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg text-left">
                    <span className="text-blue-600">
                      Unable Reservation Dates
                    </span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                </div>

                {/* Check In Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check In
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="hh/bb/tttt"
                        className="w-full p-3 border border-gray-300 rounded-lg pr-10"
                      />
                      <Calendar
                        size={16}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check In Time
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="--:--"
                        className="w-full p-3 border border-gray-300 rounded-lg pr-10"
                      />
                      <Clock
                        size={16}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Check Out */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check Out
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="hh/bb/tttt --:--"
                      className="w-full p-3 border border-gray-300 rounded-lg pr-10"
                    />
                    <Calendar
                      size={16}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* Day of Stay and Total People */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Day Of Stay
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total People
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg pr-10"
                      />
                      <Users
                        size={16}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Unit Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit Type
                  </label>
                  <div className="relative">
                    <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none">
                      <option>select</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Whatsapp Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg pr-10"
                    />
                    <MessageCircle
                      size={16}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <label className="text-sm text-gray-700">
                    I have read and agree to the
                    <span className="text-blue-600 underline cursor-pointer">
                      {" "}
                      Terms and Conditions
                    </span>
                  </label>
                </div>

                {/* Next Button */}
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Available Units */}
          <div>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  Unit Available
                </h3>
              </div>

              <div className="p-4 space-y-4">
                {/* Unit Cards */}
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="flex space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <input type="checkbox" className="mt-1" />
                    <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">kamar</h4>
                      <div className="flex items-center space-x-1 my-1">
                        {[1, 2].map((star) => (
                          <div
                            key={star}
                            className="w-4 h-4 bg-yellow-400 rounded-sm"
                          ></div>
                        ))}
                        {[1, 2, 3].map((star) => (
                          <div
                            key={star}
                            className="w-4 h-4 bg-gray-300 rounded-sm"
                          ></div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        unit type, Capacity : 3 people
                      </p>
                      <p className="font-medium text-gray-900">Rp 350/day</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
