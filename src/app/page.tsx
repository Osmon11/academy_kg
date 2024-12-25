import { MainPage } from "@/appPages/Main";

import { appAxios } from "@/shared/config/axios";
import {
  ICourseListItem,
  IFeedbackListItem,
  ITeacherListItem,
} from "@/shared/types";

export default async function Main() {
  const courseList = await appAxios
    .get<{
      results: ICourseListItem[];
    }>("academy/course_list/")
    .then((res) => res.data.results);
  const teacherList = await appAxios
    .get<{
      results: ITeacherListItem[];
    }>("academy/teacher_list/")
    .then((res) => res.data.results);
  const feedbackList = await appAxios
    .get<{
      results: IFeedbackListItem[];
    }>("academy/feedback_list/")
    .then((res) => res.data.results);
  return (
    <MainPage
      courseList={courseList}
      teacherList={teacherList}
      feedbackList={feedbackList}
    />
  );
}
