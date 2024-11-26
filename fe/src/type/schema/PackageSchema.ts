import { DetailServiceSchema } from "./ServiceSchema";

 
export type PackageType = {
  id: string;
  type_name: string;
}
export type PackageSchema ={
    id: string;
    name: string;
    type_id: string;
    price: number;
    contact_person: string;
    description: string;
    video_url: string;
    geom: unknown | null;
    min_capacity: number;
    custom: number;
    status: number;
    PackageType: PackageType;
    packageDays:PackageDay[];
    detailServices:DetailServiceSchema[]
  }
  
  export type PackageDay ={
    package_id: string;
    day: string;
    description: string;
    status: number;
    created_at: string;
    updated_at: string;
    package: PackageSchema;
    detailPackages: DetailPackage[]
  }
  
  export type DetailPackage= {
    package_id: string;
    day: string;
    activity: string;
    activity_type: string;
    object_id: string;
    description: string;
    status: number;
    created_at: string;
    updated_at: string;
    packageDay: PackageDay;
  }
  
  
  