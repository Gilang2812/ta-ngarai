"use client";
import { Package, MapPin, Phone, Calendar, ExternalLink } from "lucide-react";
import useTrackingOrder from "@/features/shipping/useTrackingOrder";
import { statusConfig } from "./statusConfig";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { TrackingPageSkeleton } from "@/components/loading/TrackingSkeletonLoader";
import dayjs from "dayjs";

const TrackingPage = ({ id }: { id: string }) => {
  const { data: trackingData, isLoading } = useTrackingOrder(id);

  const getCurrentStatusConfig = () => {
    return (
      statusConfig[trackingData?.status as keyof typeof statusConfig] ||
      statusConfig.confirmed
    );
  };

  const currentStatus = getCurrentStatusConfig();
  const StatusIcon = currentStatus.icon;

  if (!trackingData || isLoading) return <TrackingPageSkeleton />;

  return (
    <SingleContentWrapper className="max-w-4xl mx-auto">
      {/* Header */}
      <section className="bg-white border-l-4 border-green-500  rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold ">Package Tracking</h1>
          <div
            className={`flex items-center px-4 py-2 rounded-full ${currentStatus.bg}`}
          >
            <StatusIcon className={`w-5 h-5 mr-2 ${currentStatus.color}`} />
            <span className={`font-semibold ${currentStatus.color}`}>
              {currentStatus.title}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 border md:grid-cols-2 gap-4 text-sm">
          <dl className="flex items-center ">
            <Package className="w-4 h-4 mr-2" />
            <dt className="font-medium">Waybill ID:</dt>
            <dd className="ml-2 ">{trackingData.waybill_id}</dd>
          </dl>
          {trackingData?.courier?.company && (
            <dl className="flex items-center ">
              <Package className="w-4 h-4 mr-2" />
              <dt className="font-medium">Courier:</dt>
              <dd className="ml-2 ">{trackingData.courier.company}</dd>
            </dl>
          )}
          <dl className="flex items-center ">
            <dt className="font-medium">Order ID:</dt>
            <dd className="ml-2 ">{trackingData.order_id}</dd>
          </dl>
        </div>
      </section>

      <section className="grid grid-cols-1   lg:grid-cols-3 gap-6">
        {(trackingData.courier.driver_name ||
          trackingData.courier.driver_phone) && (
          <article className="bg-white border-l-4 border-primary rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold  mb-4">Courier Information</h2>
            <section className="flex items-center mb-4">
              <div>
                {trackingData?.courier?.driver_name && (
                  <p className="font-semibold ">
                    {trackingData.courier.driver_name}
                  </p>
                )}
              </div>
            </section>
            {trackingData.courier.driver_phone && (
              <section className="space-y-2 text-sm">
                <div className="flex items-center ">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{trackingData.courier.driver_phone}</span>
                </div>
              </section>
            )}
          </article>
        )}

        {/* Addresses */}
        <article className="lg:col-span-2 border border-l-4 border-l-primary bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold  mb-4">Delivery Route</h2>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 font-normal border-primary pl-4">
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span className="font-semibold ">Origin</span>
              </div>
              <p className="text-sm  mb-1">
                {trackingData.origin.contact_name}
              </p>
              <p className="text-sm ">{trackingData.origin.address}</p>
            </div>

            <div className="border-l-4 font-normal border-green-500 pl-4">
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 mr-2 text-green-500" />
                <span className="font-semibold ">Destination</span>
              </div>
              <p className="text-sm  mb-1">
                {trackingData.destination.contact_name}
              </p>
              <p className="text-sm ">
                {trackingData.destination.address
                  .split(",")
                  .slice(3, -2)
                  .toString()
                  .toLowerCase()}
              </p>
            </div>
          </section>
        </article>
      </section>

      {/* Tracking History */}
      <section className="bg-white border-l-4 border-primary rounded-xl shadow-lg p-6 mt-6">
        <article className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold ">Tracking History</h2>
          <a
            href={trackingData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-primary hover:text-text-secondary text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            View Full Details
          </a>
        </article>

        <article className="relative">
          {trackingData.history.map((item, index) => {
            const config =
              statusConfig[item.status as keyof typeof statusConfig] ||
              statusConfig.confirmed;
            const HistoryIcon = config.icon;
            const isLast = index === trackingData.history.length - 1;

            return (
              <article key={index} className="relative flex items-start pb-6">
                {!isLast && (
                  <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200"></div>
                )}

                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${config.bg} mr-4 z-10`}
                >
                  <HistoryIcon className={`w-5 h-5 ${config.color}`} />
                </div>

                <div className="flex-1  font-normal min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold ">{config.title}</p>
                    <div className="flex items-center text-xs ">
                      <Calendar className="w-3 h-3 mr-1" />
                      {dayjs(item.updated_at).format("MMM D, YYYY h:mm A")}
                    </div>
                  </div>
                  <p className="text-sm ">{item.note}</p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-100  rounded-full capitalize">
                    {item.service_type}
                  </span>
                </div>
              </article>
            );
          })}
        </article>
      </section>
    </SingleContentWrapper>
  );
};

export default TrackingPage;
