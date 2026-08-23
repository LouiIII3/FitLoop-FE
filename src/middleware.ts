import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/mypage",
  "/dashboard",
  "/personinfo",
  "/cart",
  "/checkout",
  "/products/register",
];

const adminProtectedRoutes = ["/dashboard"];

type JwtRole = "ADMIN" | "ROLE_ADMIN" | "USER" | string;

interface JwtPayload {
  sub?: string;
  role?: JwtRole;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // padding 보정
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = atob(padded);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_USE_MOCK !== "false") return NextResponse.next();
  const accessToken = req.cookies.get("access")?.value;
  const refreshToken = req.cookies.get("refresh")?.value;
  const { pathname } = req.nextUrl;

  if (pathname === "/reissue") return NextResponse.next();

  const isProtected =
    protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (!refreshToken && isProtected) {
    const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}&reason=session-expired`;
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  if ((accessToken || refreshToken) && pathname === "/login") {
    return NextResponse.redirect(new URL("/mypage", req.url));
  }

  const isAdminPath =
    adminProtectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (isAdminPath) {
    if (!accessToken) {
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    const payload = decodeJwtPayload(accessToken);
    const role = payload?.role;
    const isAdmin = role === "ADMIN" || role === "ROLE_ADMIN";

    if (!isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mypage",
    "/dashboard",
    "/personinfo",
    "/cart",
    "/checkout",
    "/products/register",
    "/reissue",
    "/login",
  ],
};
