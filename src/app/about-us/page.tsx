import { AboutUsPage } from "@/appPages/AboutUs";

import { appAxios } from "@/shared/config/axios";
import { ITeacherListItem } from "@/shared/types";

export default async function AboutUs() {
  const teammateList = await appAxios
    .get<{
      results: ITeacherListItem[];
    }>("academy/our_team_list/")
    .then((res) => res.data.results);
  const teacherList = await appAxios
    .get<{
      results: ITeacherListItem[];
    }>("academy/teacher_list/")
    .then((res) => res.data.results);
  return (
    <AboutUsPage
      teacherList={teacherList}
      teammateList={teammateList}
    />
  );
}
