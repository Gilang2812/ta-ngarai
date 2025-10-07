import { AxiosError } from "axios";

export type ActionProps<T = unknown> = {
  onSuccess: (data?: T) => void;
  onError?: (e: AxiosError) => void;
};
