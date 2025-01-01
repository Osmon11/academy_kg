export interface IProfile {
  full_name: string;
  email: string;
  gender: string;
  avatar: string | null;
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
  avatar: string;
}

export interface ITeammateListItem {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  avatar: string;
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

export type IErrorResponseData =
  | {
      message: string;
    }
  | undefined;

export interface IRecommendationListItem {
  id: number;
  title: string;
  description: string;
  image: string;
  logo: string;
}

export interface IObjectivesListItem {
  id: number;
  title: string;
}

export interface ICourseListItem {
  id: number;
  title: string;
  description: string;
  image: string;
  teacher: string;
  price: number;
}

export interface ICourseDetail
  extends Omit<ICourseListItem, "teacher"> {
  teacher: ITeacherListItem;
  objectives: IObjectivesListItem[];
  levels: {
    id: number;
    level: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  };
  lesson_count: string;
  duration_count: string;
}
