import dayjs from "dayjs";

export const isExpired = (checkout_date: string): boolean => {
  return dayjs().isAfter(dayjs(checkout_date).add(24, "hour"));
};
