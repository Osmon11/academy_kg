export interface IProfile {
  id: number;
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
  price: number | null;
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
  email: string;
  phone: string;
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
  price: number | null;
}

export interface ICourseDetail
  extends Omit<ICourseListItem, "teacher"> {
  teacher: ITeacherListItem;
  trailer: string;
  objectives: IObjectivesListItem[];
  levels: {
    id: number;
    level: number;
  };
  lesson_count: string;
  duration_count: string;
  is_learning: boolean;
}

export interface ILessonDetail {
  id: number;
  title: string;
  duration: string;
  video: string;
  text_lesson: string;
  description: string;
}

export interface IExamDetail {
  id: number;
  title: string;
  duration: string;
  pass_points: number;
}

export interface ICourseLevelDetail {
  id: number;
  level: number;
  lessons: ILessonDetail[];
  exam: IExamDetail;
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
  data: ILessonDetail | IExamDetail,
): data is IExamDetail => "pass_points" in data;

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
  href: string;
}
