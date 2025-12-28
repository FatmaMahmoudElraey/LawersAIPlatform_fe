import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { AppLangShortcuts } from "@/helpers/constants/settings.contants";

// ------------------------------
// 1) Internationalization (i18n)
// ------------------------------
const intlMiddleware = createMiddleware({
  locales: AppLangShortcuts,
  defaultLocale: "en",
});

// ------------------------------
// 2) Role-based Routing
// ------------------------------
const roleRouteMap: Record<string, string[]> = {
  student: ["/student", "/library", "/assistant"],
  lawyer: [
    "/lawyer",
    "/library",
    "/case-analysis",
    "/ocr",
    "/contracts",
    "/assistant",
  ],
  firm: [
    "/firm",
    "/library",
    "/case-analysis",
    "/ocr",
    "/contracts",
    "/assistant",
  ],
};

export default function middleware(req: NextRequest) {
  // Run next-intl first (normalizes the URL to include locale)
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse; // if locale redirect happened, stop here

  const { pathname } = req.nextUrl;

  // Extract locale prefix => "/en/..." or "/ar/..."
  const locale = pathname.split("/")[1]; // "en" or "ar"
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  // Skip if landing page or root
  if (pathWithoutLocale === "/" || !pathWithoutLocale.startsWith("/")) {
    return NextResponse.next();
  }

  // ------------------------------
  // Authentication + Role Check
  // ------------------------------
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value as
    | keyof typeof roleRouteMap
    | undefined;

  if (!token || !role) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`; // redirect to localized homepage
    return NextResponse.redirect(url);
  }

  const allowedPaths = roleRouteMap[role] ?? [];
  const isAllowed = allowedPaths.some((prefix) =>
    pathWithoutLocale.startsWith(prefix)
  );

  if (!isAllowed) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/${role}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ------------------------------
// 3) Matcher for BOTH systems
// ------------------------------
export const config = {
  matcher: [
    "/", // root → intl
    "/(en|ar)/:path*", // localized pages → intl + auth
    "/(student|lawyer|firm|library|case-analysis|ocr|contracts|assistant)/:path*",
  ],
};
