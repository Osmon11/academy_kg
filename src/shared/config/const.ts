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
  {
    label: { RU: "Главное", KG: "Негизги" },
    href: routePath("main"),
  },
  {
    label: { RU: "Вебинары", KG: "Вебинарлар" },
    href: routePath("webinars"),
  },
  {
    label: { RU: "О нас", KG: "Биз жөнүндө" },
    href: routePath("aboutUs"),
  },
  {
    label: { RU: "Поддержать", KG: "Колдоо" },
    href: routePath("supportUs"),
  },
];

export const accountNavLinks: INavLink[] = [
  {
    label: { RU: "Главное", KG: "Негизги" },
    href: routePath("accaunt"),
  },
  {
    label: { RU: "Курсы", KG: "Курстар" },
    href: routePath("courses"),
  },
  {
    label: { RU: "Прогресс", KG: "Прогресс" },
    href: routePath("progress"),
  },
];
