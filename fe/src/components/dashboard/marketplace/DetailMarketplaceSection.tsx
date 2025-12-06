import ImgCraft from "@/components/common/ImgCraft";
import { formatAddress } from "@/lib/addressFormatter";
import { SimplifiedObject } from "@/types/schema/PackageSchema";
import { UserMarketplaceSchema } from "@/types/schema/SouvenirSchema";
import { Clock, Crown, MapPin, Phone, Users } from "lucide-react";
import React from "react";
import { FaImage } from "react-icons/fa6";

type Props = {
  souvenirPlace: UserMarketplaceSchema | null;
};

const DetailMarketplaceSection = ({ souvenirPlace }: Props) => {
  return (
    <div className="p-4 space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold  mb-2">{souvenirPlace?.name}</h3>
          <div className="flex items-start gap-2  mb-3">
            <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>{formatAddress(souvenirPlace as unknown as SimplifiedObject)}</span>
          </div>
          <div className="flex items-center gap-2  mb-3">
            <Phone className="w-5 h-5 flex-shrink-0" />
            <span>Contact: {souvenirPlace?.contact_person}</span>
          </div>
          <div className="flex items-center gap-2 ">
            <Clock className="w-5 h-5 flex-shrink-0" />
            <span>
              Buka: {souvenirPlace?.open} - {souvenirPlace?.close}
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold  mb-2">Deskripsi</h4>
          <p className=" leading-relaxed">{souvenirPlace?.description}</p>
        </div>
      </div>

      {souvenirPlace?.galleries && souvenirPlace?.galleries.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FaImage className="w-5 h-5 " />
            <h4 className="font-semibold ">Galeri</h4>
          </div>

          {souvenirPlace?.galleries.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {souvenirPlace?.galleries.map((gallery, index) => (
                <div key={index}>
                  <ImgCraft
                    src={gallery?.url}
                    alt={gallery?.souvenir_place_id}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {souvenirPlace?.detailSouvenir &&
        souvenirPlace?.detailSouvenir?.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 " />
              <h4 className="font-semibold ">
                Anggota (
                {
                  souvenirPlace?.detailSouvenir?.filter(
                    (detail) => detail.status !== 0
                  ).length
                }
                )
              </h4>
            </div>

            <div className="grid gap-3">
              {souvenirPlace?.detailSouvenir
                ?.filter((detail) => detail.status !== 0)
                .map((detail) => (
                  <div
                    key={`${detail?.user_id}-${detail.id_souvenir_place}`}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="relative">
                      <ImgCraft
                        src={detail?.user?.user_image ?? ""}
                        alt={detail?.user?.fullname}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {detail?.status === 1 && (
                        <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                          <Crown className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium ">
                          {detail?.user?.fullname}
                        </h5>
                        {detail?.status === 1 && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Owner
                          </span>
                        )}
                      </div>
                      <p className="text-sm ">
                        {detail?.user?.username &&
                          `"@${detail?.user?.username}"`}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm ">{detail?.user?.email}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default DetailMarketplaceSection;
