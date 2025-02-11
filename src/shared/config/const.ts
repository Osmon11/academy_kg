import { INavLink } from "../types";

export const SECTION_PADDING = {
  xs: "25px 15px 0px",
  sm: "25px 30px 0px",
  md: "50px 50px 0px",
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
    routeName: "main",
  },
  {
    label: "webinars",
    routeName: "webinars",
  },
  {
    label: "aboutUs",
    routeName: "aboutUs",
  },
  {
    label: "supportUs",
    routeName: "supportUs",
  },
];

export const accountNavLinks: INavLink[] = [
  {
    label: "main",
    routeName: "accaunt",
  },
  {
    label: "courses",
    routeName: "courses",
  },
  {
    label: "progress",
    routeName: "progress",
  },
];
