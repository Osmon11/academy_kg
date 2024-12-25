export interface ICourseListItem {
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

export interface IWebinarListItem {
  id: number;
  title: string;
  duration: string;
  level: number;
  start_time: string;
  place_count: number;
  image: string;
}
