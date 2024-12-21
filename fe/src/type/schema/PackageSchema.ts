 
export type PackageTypeSchema = {
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
 
  }
  
  export type PackageDay ={
    package_id: string;
    day: string;
    description: string;
    status: number;
    created_at: string;
    updated_at: string;
  }
  
  export type DetailPackageSchema= {
    package_id: string;
    day: string;
    activity: string;
    activity_type: string;
    object_id: string;
    description: string;
    status: number;
 
  }
  
  
  