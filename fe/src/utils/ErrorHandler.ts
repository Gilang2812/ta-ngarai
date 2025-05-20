 
import { showErrorAlert } from "./AlertUtils";
import { AxiosError } from "axios";

export const onError = (error: AxiosError) => {
  console.log(error.response?.data)
  showErrorAlert(error);
};
