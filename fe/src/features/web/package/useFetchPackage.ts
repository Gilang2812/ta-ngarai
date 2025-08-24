import { useAxiosAuth } from "@/lib/axios";
import { GalleryPackageSchema } from "@/type/schema/GallerySchema";
import {
  DetailPackageSchema,
  PackageDay,
  PackageSchema,
} from "@/type/schema/PackageSchema";
import { DetailServiceSchema } from "@/type/schema/ServiceSchema";
import { useQuery } from "@tanstack/react-query";
type FetchProps = {
  package?: boolean | string;
  service?: boolean | string;
  gallery?: boolean | string;
  custom?: boolean | string;
};

type Props = PackageSchema & {
  packageDays?:
    | (PackageDay & {
        detailPackages: DetailPackageSchema[];
      })[]
    | [];
  packageGalleries?: GalleryPackageSchema[] | [];
  detailServices?: DetailServiceSchema[] | [];
};

export const useFetchPackages = <T extends Props>(query: FetchProps) => {
  const axiosInstance = useAxiosAuth()
 return useQuery<T[]>({
    queryKey: ["package"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/packages", {
        params: query,
      });
      return data;
    },
  });
};
