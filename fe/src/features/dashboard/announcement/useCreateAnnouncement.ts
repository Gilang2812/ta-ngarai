import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { AnnouncementSchema } from "@/types/schema/AnnouncementSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCreateAnnouncement = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth();
  return useMutation({
    mutationFn: async (body: AnnouncementSchema) => {
      const { data } = await axiosInstance.post("/announcement", body);
      return data;
    },
    onSuccess,
    onError,
  });
};
