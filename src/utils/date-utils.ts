import dayjs from "dayjs";

export function formatDateToDisplay(date: string): string {
  return dayjs(date).format("DD MMM YYYY");
}
