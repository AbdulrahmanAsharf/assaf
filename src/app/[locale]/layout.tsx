// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Cairo, Poppins } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import ClientLayout from "./ClientLayout";
import { getMessages } from 'next-intl/server'; 

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-cairo"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins"
});


export const metadata: Metadata = {
  title: "عساف للعطور | 3saf - إما العظمة أو لا شيء",
  description:
    "عطور عساف الاصلية - عطور سعودية فاخرة بثبات عالي: فيكتوريا، بينك ليدي، عود نجدي. شحن مجاني وتغليف هدايا 🎁",
  openGraph: {
    title: "عساف للعطور | 3saf Perfumes",
    description: "إما العظمة أو لا شيء - عطور سعودية فاخرة بثبات يدوم 24 ساعة",
    images: ["/og-assaf.jpg"],
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  if (!["ar", "en"].includes(locale)) notFound();

  const dir = locale === "ar" ? "rtl" : "ltr" as const; 
  const fontClass = locale === "ar" ? cairo.variable : poppins.variable;
  const messages = await getMessages();

  return (
    <ClerkProvider>
      <ClientLayout locale={locale} dir={dir} fontClass={fontClass} messages={messages}>
        {children}
      </ClientLayout>
    </ClerkProvider>
  );
}