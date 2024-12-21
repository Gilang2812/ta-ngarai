import { CustomError } from "@/type/props/ErrorProps";
import { showErrorAlert } from "./AlertUtils";

export const onError = (error: CustomError) => {
  showErrorAlert(error);
};
