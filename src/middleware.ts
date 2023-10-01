import { NextRequest, NextResponse } from "next/server";
import { decode } from "jsonwebtoken";
import cookie from "cookie";

const secret: any = process.env.JWT_SECRET_KEY;
const DomainURL = process.env.DOMAIN_URL;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookies = req.headers.get("Cookie") || "";
  const parsedCookies = cookie.parse(cookies);
  const token = parsedCookies.token;
  const decodedToken: any = decode(token);
  // const tokenVerified = verify(token, secret);
  // if (!tokenVerified) {
  //   return NextResponse.redirect(new URL("/login", DomainURL));
  // }
  const roleId = decodedToken?.roleId;
  const openPaths = [
    "/api/auth/login",
    "/api/auth/check-token",
    "/api/auth/refresh-token",
    "/api/auth/change-password",
    "/api/recomendation/crop-selection",
    "/api/recomendation/fertilization",
    "/api/analyze",
    "/api/agrocalendar",
  ];
  const protectedPaths = [
    "/api/statistics",
    "/api/agency-expenses",
    "/api/agents",
  ];
  const protectedRoutes = ["/cultures", "/statistics"];

  if (openPaths.includes(pathname)) {
    return NextResponse.next();
  }
  if (protectedRoutes.includes(pathname) && roleId === 3) {
    return NextResponse.redirect(new URL("/home", DomainURL));
  }
  if (pathname.startsWith("/agents") && roleId === 3) {
    return NextResponse.redirect(new URL("/home", DomainURL));
  }

  if (
    (protectedPaths.includes(pathname) && roleId === 1) ||
    (protectedPaths.includes(pathname) && roleId === 2)
  ) {
    const response = NextResponse.next();
    response.headers.set("email", decodedToken.email);
    return response;
  }
  if (protectedPaths.includes(pathname) && roleId === 3) {
    return NextResponse.redirect(new URL("/home", DomainURL));
  }
  if (token) {
    const response = NextResponse.next();
    response.headers.set("email", decodedToken.email);
    return response;
  }
}

export const config = {
  matcher: ["/api/:path*", "/agents", "/agents/:path*", "/statistics"],
  unstable_allowDynamic: [
    // use a glob to allow anything in the function-bind 3rd party module
    "/node_modules/lodash/**",
    "/node_modules/jsonwebtoken/**",
    "/node_modules/lodash/",
    "/node_modules/jsonwebtoken",
    "./node_modules/lodash/lodash.js",
    "./node_modules/jsonwebtoken/sign.js",
    "./node_modules/jsonwebtoken/index.js",
  ],
};
