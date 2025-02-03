import moment from "moment";

import { TIME_FORMAT } from "../config/const";

export function getAllSeconds(
  date: string,
  dateFormat = TIME_FORMAT,
) {
  const durationTime = moment(date, dateFormat);
  return (
    durationTime.hours() * 3600 +
    durationTime.minutes() * 60 +
    durationTime.seconds()
  );
}
