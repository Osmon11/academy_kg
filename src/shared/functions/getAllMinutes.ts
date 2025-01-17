import moment from "moment";

import { TIME_FORMAT } from "../config/const";

export function getAllMinutes(
  date: string,
  dateFormat = TIME_FORMAT,
) {
  const durationTime = moment(date, dateFormat);
  return (
    durationTime.hours() * 60 +
    durationTime.minutes()
  );
}
