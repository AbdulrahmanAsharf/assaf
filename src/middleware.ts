// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// الصفحات المحمية
const protectedPaths = [
  'profile',
  'pending_orders', 
  'orders',
  'notifications',
  'wishlist'
];

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  
  // استخراج اللغة والمسار
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en';
  const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, '') || '/';
  
  // فحص إذا كان المسار محمي
  const isProtected = protectedPaths.some(path => 
    pathWithoutLocale === `/${path}` || pathWithoutLocale.startsWith(`/${path}/`)
  );
  
  if (isProtected) {
    const { userId } = await auth();
    
    if (!userId) {
      // إعادة توجيه للصفحة الرئيسية مع الحفاظ على اللغة
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  }
  
  // تطبيق next-intl middleware
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // تطابق كل المسارات ما عدا الملفات الثابتة
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // تطابق always root
    '/',
    // تطابق الـ locales
    '/(ar|en)/:path*'
  ],
};