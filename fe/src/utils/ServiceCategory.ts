import { PackageService } from "@/features/web/package/useFetchPackage";

export const useService =(category:1|2,data?:PackageService)=>{
    return data?.detailServices.filter(service =>service.service.category===category);
}