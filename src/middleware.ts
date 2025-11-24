/* eslint-disable @typescript-eslint/no-explicit-any */
// src/middleware.ts

import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware({
  ...routing,
  // أهم سطر في التاريخ: إستثني كل الـ API Routes من الـ locale rewrite
  localePrefix: "as-needed",
  pathnames: routing.locales.reduce((acc, locale) => {
    acc[`/${locale}/api`] = "/api";
    return acc;
  }, {} as any),
});

const protectedPaths = [
  "profile",
  "pending_orders",
  "orders",
  "notifications",
  "wishlist",
];

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();
  const pathname = req.nextUrl.pathname;

  // إستثناء الـ API Routes من أي حماية أو إعادة توجيه
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // استخراج اللغة
  const locale = pathname.startsWith("/ar") ? "ar" : "en";
  const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, "") || "/";

  const isProtected = protectedPaths.some((path) =>
    pathWithoutLocale === `/${path}` || pathWithoutLocale.startsWith(`/${path}/`)
  );

  if (isProtected && !userId) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // طبق الـ intl middleware بس للصفحات العادية (مش الـ API)
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/",
    "/(api|ar|en)/:path*",
  ],
};