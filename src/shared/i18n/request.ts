import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(
  async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (
      !locale ||
      // @ts-expect-error Argument of type 'string' is not assignable to parameter of type '"ru-RU" | "ky-KG"'.
      !routing.locales.includes(locale)
    ) {
      locale = routing.defaultLocale;
    }

    return {
      locale,
      messages: (
        await import(`./messages/${locale}.json`)
      ).default,
    };
  },
);
