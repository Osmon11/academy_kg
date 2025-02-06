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
    label: "main",
    href: routePath("main"),
  },
  {
    label: "webinars",
    href: routePath("webinars"),
  },
  {
    label: "aboutUs",
    href: routePath("aboutUs"),
  },
  {
    label: "supportUs",
    href: routePath("supportUs"),
  },
];

export const accountNavLinks: INavLink[] = [
  {
    label: "main",
    href: routePath("accaunt"),
  },
  {
    label: "courses",
    href: routePath("courses"),
  },
  {
    label: "progress",
    href: routePath("progress"),
  },
];
