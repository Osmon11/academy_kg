import { routePath } from "../functions";
import { INavLink } from "../types";

export const SECTION_PADDING = {
  xs: "25px 15px 0px",
  md: "50px 30px 0px",
  lg: "50px 50px 0px",
};

export const SECTION_MARGIN_TOP = {
  xs: "40px",
  md: "50px",
  lg: "80px",
};

export const TIME_FORMAT = "HH:mm:ss";

export const PAGINATION_LIMIT = 10;

export const mainNavLinks: INavLink[] = [
  { label: "Главное", href: routePath("main") },
  {
    label: "Вебинары",
    href: routePath("webinars"),
  },
  { label: "О нас", href: routePath("aboutUs") },
  {
    label: "Поддержать",
    href: routePath("supportUs"),
  },
];

export const accountNavLinks: INavLink[] = [
  {
    label: "Главное",
    href: routePath("accaunt"),
  },
  {
    label: "Курсы",
    href: routePath("courses"),
  },
];
