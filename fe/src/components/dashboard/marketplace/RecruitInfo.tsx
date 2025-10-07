import ButtonTooltip from "@/components/common/ButtonTooltip";
import ImgCraft from "@/components/common/ImgCraft";
import { UserMarketplaceSchema } from "@/types/schema/SouvenirSchema";
import { 
  UserX,
  Clock,
  Store,
  Users, 
  UserMinus, 
} from "lucide-react";
import React from "react"; 

type Props = {
  data: UserMarketplaceSchema[];
  onUpdateStatus: (userId: number, status: number, souvenirId: string) => void;
};

const RecruitInfo = ({ data, onUpdateStatus }: Props) => {
  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
            <Clock size={10} />
            Pending
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-green-700 rounded-full text-xs font-medium">
            <UserX size={10} />
            accepted
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {data?.map((item) => {
        const filtered = item?.detailSouvenir?.filter(
          (detail) => detail?.status !== 1
        );

        return (
          <div
            key={item?.id}
            className="bg-white rounded-lg shadow-sm border p-4"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Store className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold ">{item?.name}</h3>
                <div className="flex items-center gap-1 text-sm ">
                  <Users size={12} />
                  <span>{filtered?.length || 0} applications</span>
                </div>
              </div>
            </div>

            {/* Applications */}
            {filtered && filtered.length > 0 ? (
              <div className="space-y-3">
                {filtered.map((detail) => (
                  <div
                    key={`${detail?.id_souvenir_place}-${detail?.user_id}`}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                        {detail?.user?.user_image ? (
                          <ImgCraft
                            alt="User avatar"
                            src={detail.user.user_image}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {detail?.user?.fullname?.charAt(0) ||
                                detail?.user?.username?.charAt(0) ||
                                "U"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-medium  truncate">
                          {detail?.user?.fullname ||
                            detail?.user?.username ||
                            "Unknown User"}
                        </p>
                        <p className="text-sm  truncate">
                          {detail?.user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {getStatusBadge(detail.status)}

                      <div className="flex gap-1">
                        {detail.status === 0 && onUpdateStatus && (
                          <ButtonTooltip
                            label="Cancel Recruit"
                            variant={"warning"}
                            onClick={() =>
                              onUpdateStatus(
                                Number(detail.user_id),
                                detail.status,
                                detail.id_souvenir_place.toString()
                              )
                            }
                          title="Accept"
                          >
                            <UserX size={14} />
                          </ButtonTooltip>
                        )}

                        {detail.status === 2 && (
                          <ButtonTooltip
                            label="Fire"
                            variant={"danger"}
                            onClick={() =>
                              onUpdateStatus(
                                Number(detail.user_id),
                                detail.status,
                                detail.id_souvenir_place.toString()
                              )
                            }
                           title="Reject"
                          >
                            <UserMinus size={14} />
                          </ButtonTooltip>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Users className="w-8 h-8  mx-auto mb-2" />
                <p className=" text-sm">No invitations</p>
              </div>
            )}
          </div>
        );
      })}

      {(!data || data.length === 0) && (
        <div className="text-center py-8">
          <Store className="w-12 h-12  mx-auto mb-3" />
          <p className="">No souvenir places found</p>
        </div>
      )}
    </div>
  );
};

export default RecruitInfo;
