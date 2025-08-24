import { useAxiosAuth } from "@/lib/axios";
import { AnnouncementSchema } from "@/type/schema/AnnouncementSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchAnnouncements = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<AnnouncementSchema[]>({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/announcement");
      return data;
    },
  });
};
