import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { getLocale } from "next-intl/server";
import {
  NextRequest,
  NextResponse,
} from "next/server";

import { routePath } from "./shared/functions";
import {
  getPathname,
  routing,
} from "./shared/i18n/routing";

const publicPages = [
  routePath("main"),
  routePath("aboutUs"),
  routePath("supportUs"),
  routePath("webinars"),
  routePath("signIn"),
  routePath("signUp"),
  // (/secret requires auth)
];

const handleI18nRouting =
  createMiddleware(routing);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ req, token }) =>
        Boolean(
          req.cookies.get(
            process.env
              .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
          ),
        ) || token != null,
    },
  },
);

export default async function middleware(
  req: NextRequest,
) {
  const locale = await getLocale();

  if (
    req.nextUrl.pathname === routePath("signIn")
  ) {
    return NextResponse.redirect(
      new URL(
        getPathname({
          locale,
          href: routePath("signIn"),
        }),
        req.url,
      ),
    );
  }

  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );
  const isPublicPage = publicPathnameRegex.test(
    req.nextUrl.pathname,
  );

  if (isPublicPage) {
    // If the user is already authorized redirect to account page
    if (
      req.cookies.get(
        process.env
          .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
      ) &&
      req.url.includes("authorization")
    ) {
      return NextResponse.redirect(
        new URL(
          getPathname({
            locale,
            href: routePath("accaunt"),
          }),
          req.url,
        ),
      );
    }
    return handleI18nRouting(req);
  } else {
    // @ts-expect-error Expected 2 arguments, but got 1.
    return authMiddleware(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
