import { axiosInstance } from "@/lib/axios";
import { CheckSUserResponse } from "@/type/schema/UsersSchema";
import * as yup from "yup";

export const packageDayFormSchema = yup.object().shape({
  package_id: yup.string().required(),
  current_day: yup.number().min(1).nullable().optional(),
  day: yup.number().min(1).required(),
  description: yup.string().required(),
});

export const detailPackageFormSchema = yup.object().shape({
  package_id: yup.string().required(),
  day: yup.number().min(1).required(),
  description: yup.string().required(),
  activity: yup.number().min(1).required(),
  object_id: yup.string().required("select the tourism object"),
});

export const editPackageFormSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .test("unique-name", "name already exists", async (value) => {
      if (!value) return false;
      const { data } = await axiosInstance.post<CheckSUserResponse>(
        "/packages/unique-package",
        {
          name: value,
        }
      );
      return data.available;
    }),
  type_id: yup.string().required(),
  min_capacity: yup.number().min(1).required(),
  contact_person: yup.string().required(),
  description: yup.string().required(),
});

export const packageTypeFormSchema = yup.object().shape({
  type_name: yup.string().required(),
});
