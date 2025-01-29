import queryString from "query-string";

import { ERoute } from "../config/enum";

interface IOptions {
  dynamicPaths?: {
    [key: string]: string | number;
  };
  queryParams?: {
    [key: string | number]:
      | string
      | number
      | null;
  };
}

export function routePath(
  route: keyof typeof ERoute,
  options?: IOptions,
) {
  let result = ERoute[route].toString();

  if (options && "dynamicPaths" in options) {
    for (const key in options.dynamicPaths) {
      result = result.replace(
        `[${key}]`,
        options.dynamicPaths[key].toString(),
      );
    }
  }

  if (
    typeof options?.queryParams === "object" &&
    Object.entries(options.queryParams).length > 0
  ) {
    result += `?${queryString.stringify(options.queryParams)}`;
  }

  return result;
}
