import { showErrorAlert } from "./AlertUtils";
import { AxiosError } from "axios";

export const onError = (error: AxiosError) => {
  showErrorAlert(error);
};
