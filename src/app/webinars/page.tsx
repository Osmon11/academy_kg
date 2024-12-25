import { WebinarsPage } from "@/appPages/Webinars";

import { appAxios } from "@/shared/config/axios";
import {
  IWebinarAfterward,
  IWebinarListItem,
} from "@/shared/types";

export default async function Webinars() {
  const webinarList = await appAxios
    .get<{
      results: IWebinarListItem[];
    }>("academy/webinar_list/")
    .then((res) => res.data.results);
  const webinarAfterwards = await appAxios
    .get<{
      results: IWebinarAfterward[];
    }>("academy/webinar_afterwards/")
    .then((res) => res.data.results);
  return (
    <WebinarsPage
      webinarList={webinarList}
      webinarAfterwards={webinarAfterwards}
    />
  );
}
