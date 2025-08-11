import {
  detailServiceFormSchema,
  serviceFormSchema,
} from "@/validation/service.validation";
import * as yup from "yup";

export type DetailServiceSchema = {
  service: ServicePackage;
  package_id: string;
  service_package_id: string;
  status: number;
  status_created?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type ServicePackage = {
  id: string;
  name: string;
  price: number;
  category: number;
  min_capacity: number;
};

export type DetailServiceFormSchema = yup.InferType<
  typeof detailServiceFormSchema
>;

export type ServiceFormSchema = yup.InferType<typeof serviceFormSchema>&{
  id: string;
};
