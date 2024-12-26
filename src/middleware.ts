import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(
    "access_token_ilimnuru_kg",
  );
  if (!accessToken) {
    return NextResponse.redirect(
      new URL("/authorization/login", req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/personal-accaunt/:path*"], // Protect specific routes
};
