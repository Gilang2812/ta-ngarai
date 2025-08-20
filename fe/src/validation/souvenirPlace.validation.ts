import { axiosInstance } from "@/lib/axios";
import { CheckSUserResponse } from "@/type/schema/UsersSchema";
import * as yup from "yup";

export const recrutStaff = yup.object().shape({
  user: yup
    .string()
    .required("User is required")
    .test("is-exist-user", "User is not exist", async (value) => {
      if (!value) return false;

      const { data } = await axiosInstance.post<CheckSUserResponse>(
        "/unique-field",
        {
          field: value,
        }
      );
      return !data.available;
    }),
  id_souvenir_place: yup.string().required("select souvenir place"),
});
