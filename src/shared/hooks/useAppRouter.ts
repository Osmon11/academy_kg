import { useLocale } from "next-intl";
import { useRouter } from "next-nprogress-bar";

import { routePath } from "../functions";
import { getPathname } from "../i18n/routing";

export function useAppRouter() {
  const locale = useLocale();
  const router = useRouter();
  return {
    push(...args: Parameters<typeof routePath>) {
      router.push(
        getPathname({
          locale,
          href: routePath(...args),
        }),
      );
    },
    replace(
      ...args: Parameters<typeof routePath>
    ) {
      router.replace(
        getPathname({
          locale,
          href: routePath(...args),
        }),
      );
    },
    back: router.back,
    forward: router.forward,
    refresh: router.refresh,
  };
}
