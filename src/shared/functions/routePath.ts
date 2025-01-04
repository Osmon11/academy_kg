import queryString from "query-string";

import { ERoute } from "../config/enum";

interface IOptions {
  id?: number;
  queryParams?: {
    [key: string | number]: string | number;
  };
}

export function routePath(
  route: keyof typeof ERoute,
  options?: IOptions,
) {
  let result = ERoute[route].toString();

  if (
    result.includes("[") &&
    typeof options?.id === "number"
  ) {
    result = result.replace(
      "[id]",
      options.id.toString(),
    );
  }

  if (
    typeof options?.queryParams === "object" &&
    Object.entries(options.queryParams).length > 0
  ) {
    result += `?${queryString.stringify(options.queryParams)}`;
  }

  return result;
}
