export type  DetailServiceSchema = {
    package_id: string;
    service_package_id: string;
    status: number;
    status_created?: number | null;
    ServicePackage: ServicePackage;
    created_at?: Date | null;
    updated_at?: Date | null;
  }
 
  export type ServicePackage = {
    id: string
    name: string
    price: number,
    category: number,
    min_capacity: number
  }