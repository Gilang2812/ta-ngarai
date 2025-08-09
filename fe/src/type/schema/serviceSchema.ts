import { serviceFormSchema } from "./../../validation/service.validation";
import * as yup from "yup";

export type DetailServiceSchema = {
  package_id: string;
  service_package_id: string;
  status: number;
  status_created?: number | null;
  service: ServicePackage;
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

export type ServiceFormSchema = yup.InferType<typeof serviceFormSchema>;
