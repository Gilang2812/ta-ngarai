"use client";
import Button from "@/components/common/Button";
import { useDeleteDetailSouvenir } from "@/features/dashboard/marketplace/useDeleteDetailSouvenir";
import { useFetchDetailUserSouvenirPlace } from "@/features/dashboard/marketplace/useFetchDetailUserSouvenir";
import { useUpdateDetailSouvenir } from "@/features/dashboard/marketplace/useUpdateDetailSouvenir";
import useClickOutside from "@/hooks/useOutsideClick";
import useToggleOpen from "@/hooks/useToggleOpen";
import {
  confirmAlert,
  confirmDeleteAlert,
  cornerAlert,
} from "@/utils/AlertUtils";
import { Spinner } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Store } from "lucide-react";
import React from "react";

const NotifInvitations = () => {
  const { isOpen, toggle, setIsOpen } = useToggleOpen();
  const { data, isLoading, refetch } = useFetchDetailUserSouvenirPlace(0);

  const wrapperRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });
  const { mutate, isPending } = useUpdateDetailSouvenir({
    onSuccess: () => {
      cornerAlert("Request accepted");
      refetch();
    },
  });

  const { mutateAsync: deleteMutate, isPending: isDeletePending } =
    useDeleteDetailSouvenir({
      onSuccess: () => {
        cornerAlert("Request rejected");
        refetch();
      },
    });
  const handleAccept = (id_souvenir_place: string, user_id: string) => {
    confirmAlert(
      "Accept Request",
      "Are you sure you want to accept this request?",
      async () => {
        mutate({ id_souvenir_place, user_id, status: 2 });
      }
    );
  };

  const handleDelete = ({
    id_souvenir_place,
    user_id,
  }: {
    id_souvenir_place: string;
    user_id: number;
  }) => {
    confirmDeleteAlert(
      "Request",
      "this Request",
      async () => await deleteMutate({ id_souvenir_place, user_id })
    );
  };
  const filtered = data?.filter((item) => item.status == 0) || [];

  if (isLoading) return <Spinner />;
  return (
    data &&
    filtered.length > 0 && (
      <div
        ref={wrapperRef}
        aria-label="notification"
        className="relative bg-white rounded-lg"
      >
        <button
          type="button"
          className="flex items-center border border-transparent hover:shadow-xl w-full h-full transition-ease-in-out hover:bg-primary/10 aspect-square justify-center hover:border-primary hover:text-primary p-4   cursor-pointer"
          onClick={toggle}
        >
          <Bell />
        </button>
        <span className="absolute size-4 top-0 right-0 text-xs text-white bg-red-600 rounded-full px-1"></span>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 z-10 space-y-2 top-full mt-2 w-fit bg-white shadow-lg rounded-lg p-2"
            >
              {filtered?.map((item, index) => (
                <article
                  key={`${index}`}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Left side - Store info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                        <Store className="size-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate capitalize">
                          {item.souvenirPlace.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Recruitment Application
                        </p>
                      </div>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        onClick={() =>
                          handleAccept(item.id_souvenir_place, item.user_id)
                        }
                        isLoading={isPending}
                        disabled={isPending}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() =>
                          handleDelete({
                            id_souvenir_place: item.id_souvenir_place,
                            user_id: Number(item.user_id),
                          })
                        }
                        isLoading={isDeletePending}
                        disabled={isDeletePending}
                        variant={"regDanger"}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  );
};

export default NotifInvitations;
