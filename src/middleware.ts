// src/middleware.ts

import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedPaths = [
  'profile',
  'pending_orders', 
  'orders',
  'notifications',
  'wishlist'
];

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  
  // استخراج اللغة
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en';
  const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, '') || '/';
  
  const isProtected = protectedPaths.some(path => 
    pathWithoutLocale === `/${path}` || pathWithoutLocale.startsWith(`/${path}/`)
  );
  
  if (isProtected) {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  }

  // السطرين السحريين اللي هيحلوا كل مشاكل الـ 404 في العالم كله
  const response = intlMiddleware(req);
  response.headers.set("x-locale", locale);   // ← أهم سطر في حياتك دلوقتي
  return response;
  // نهاية السطرين السحريين
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/',
    '/(ar|en)/:path*'
  ],
};