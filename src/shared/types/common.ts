import { ERoute } from "../config/enum";

export interface IProfile {
  id: number;
  name: string;
  surname: string;
  full_name: string;
  email: string;
  gender: string;
  avatar?: string | null;
  phone: string;
  level: number;
}

export interface ISubjectListItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: null;
  trailer: string | null;
}

export interface IFeedbackListItem {
  id: number;
  full_name: string;
  comment: string;
  region: string;
  avatar?: string;
}

export interface ITeammateListItem {
  id: number;
  full_name: string;
  email: string | null;
  phone: string | null;
  avatar?: string;
  position: string;
}

export type ITeacherListItem = ITeammateListItem;

export interface IRequisiteListItem {
  id: number;
  qr_code: string;
  bank: string;
  phone: string;
  bank_account: string;
  name: string;
}

export interface IWebinar {
  id: number;
  title: string;
  level: number;
  start_time: string;
  image: string;
}

export interface IUpcomingWebinarListItem
  extends IWebinar {
  duration: string;
  busy_count: number;
  place_count: number;
  is_requested: boolean;
}

export interface IWebinarAfterwardListItem
  extends IWebinar {
  duration_video: string;
  video: string;
}

export type IErrorResponseData = {
  message: string;
};

export interface IObjectivesListItem {
  id: number;
  title: string;
}

export interface ICourseListItem {
  id: number;
  title: string;
  description: string;
  image: string | null;
  icon: string | null;
  teacher: ITeacherListItem | null;
  price: string;
}

export interface ILevel {
  id: number;
  level: number;
}

export interface ICourseDetail
  extends Omit<
    ICourseListItem,
    "teacher" | "icon"
  > {
  teacher: ITeacherListItem;
  trailer: string;
  objectives: IObjectivesListItem[];
  levels: ILevel[];
  lesson_count: number;
  duration_count: string;
  is_learning: boolean;
  finished_count: number;
  current_level: number;
  current_lesson: number | null;
}

export interface ILessonDetail {
  id: number;
  title: string;
  duration: string;
  video: string;
  text_lesson: string;
  description: string;
  course_level: ILevel;
  is_finished: boolean;
}

export interface IExamDetail {
  id: number;
  title: string;
  duration: string;
  pass_points: number;
  user_exam_result: Omit<
    IExamResults,
    "max_points"
  > | null;
}

export interface ICourseLevelDetail {
  id: number;
  level: number;
  finished_count: number;
  lessons: ILessonDetail[];
  exam: IExamDetail | null;
}

export interface ISetOfCourses {
  id: number;
  title: string;
  description: string;
  img: string;
  course_count: number | null;
}

export interface IUser {
  id: number;
  full_name: string;
  avatar?: string | null;
}

export interface IComment {
  id: number;
  comment: string;
  user: IUser;
  created_at: string;
  answer: string | null;
}

export const isExamTypeGuard = (
  data: ILessonDetail | IExamDetail | null,
): data is IExamDetail =>
  data ? "pass_points" in data : false;

export interface IAnswer {
  id: number;
  key: string;
  value: string;
  is_correct: boolean;
}

export interface IQuestion {
  id: number;
  question: string;
  answers: IAnswer[];
  point: number;
}

export interface IExamQuestions
  extends IExamDetail {
  point_sum: number;
  questions: IQuestion[];
}

export interface IMyCourseListDetail {
  level: number;
  lesson_count: number;
  finished_count: number;
  exam_result: "Passed" | "Not passed" | null;
  lesson: string;
}

export interface IMyCourseListItem
  extends Pick<
    ICourseListItem,
    "id" | "title" | "image" | "icon"
  > {
  detail: IMyCourseListDetail;
}

export interface IPaginatedList<ListItem> {
  count: number;
  next: number | null;
  previous: number | null;
  results: ListItem[];
}

export interface INavLink {
  label: string;
  routeName: keyof typeof ERoute;
}

export interface IExamResults {
  passed_count: number; // correct answers count from exam result
  point_sum: number; // points sum from correct answers
  question_count: number;
  is_passed: boolean;
  pass_points: number; // min points to pass exam
  max_points: number; // sum of all points in questions
  updated_at: string;
}

export interface ICourseProgress {
  id: number;
  title: string;
  lesson_count: number;
  lessons: Array<{
    id: number;
    title: string;
    course_level: number;
    is_finished: boolean;
  }>;
  exam: {
    id: number;
    title: string;
    duration: string;
    levelId: number;
    user_results: IExamResults | null;
  } | null;
}

export interface IStatistics {
  courses: number;
  students: number;
  lessons: number;
  views: number;
}
