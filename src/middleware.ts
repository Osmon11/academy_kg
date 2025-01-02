import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(
    process.env
      .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
  );
  if (accessToken) {
    if (req.url.includes("authorization")) {
      return NextResponse.redirect(
        new URL(
          "/personal-accaunt/main",
          req.url,
        ),
      );
    }
  } else {
    if (req.url.includes("personal-accaunt")) {
      return NextResponse.redirect(
        new URL("/authorization/login", req.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/personal-accaunt/:path*",
    "/authorization/:path*",
  ], // Protect specific routes
};
