import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && request.nextUrl.pathname !== "/login") {
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};
