import { SupportUsPage } from "@/appPages/SupportUs";

import { appAxios } from "@/shared/config/axios";
import { IRequisiteListItem } from "@/shared/types";

export default async function SupportUs() {
  const requisiteList = await appAxios
    .get<{
      results: IRequisiteListItem[];
    }>("academy/requisite_list/")
    .then((res) => res.data.results);
  return (
    <SupportUsPage
      requisiteList={requisiteList}
    />
  );
}
