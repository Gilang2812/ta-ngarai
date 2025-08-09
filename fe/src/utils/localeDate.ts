import dayjs from "dayjs";

export const localeDate = (date: string | Date) => {
  const dateString = new Date(date)
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace("at", ",");
  return dateString;
};

export const localeDayDateTime = (date: string | Date) => {
  const dateString = new Date(date)
    .toLocaleString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/(\w+day)\s/, "$1, ")
    .replace("at", "");
  return dateString;
};

export const localeDayDate = (date: string) => {
  dayjs(date).locale("en-gb");
  const dateString = dayjs(date).format("dddd, D MMMM YYYY HH:mm:ss");
  return dateString;
};

export const addDays = (date: string, days: number): Date => {
  const inputDate = new Date(date);
  inputDate.setDate(inputDate.getDate() + days);
  return inputDate;
};
