// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // 1. next-intl يضبط اللغة والـ pathname
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  // 2. بعد تعديل الـ pathname
  const pathname = req.nextUrl.pathname;

  // 3. تحقق من /ar/profile أو /en/profile
  const isProfilePage = /^\/(ar|en)\/profile($|\/)/.test(pathname);

  if (isProfilePage) {
    const { userId } = await auth();
    if (!userId) {
      return Response.redirect(new URL("/", req.url));
    }
  }

  return intlResponse;
});

export const config = {
  matcher: [
    "/((?!_next|api|.*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|webp|svg|mp4|webm|mov|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};