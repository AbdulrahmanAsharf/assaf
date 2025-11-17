// src/app/[locale]/ClientLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import { Bounce, ToastContainer } from 'react-toastify';
import ScrollCircle from "@/components/ScrollCircle/ScrollCircle";
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl'; 

type Dir = "rtl" | "ltr"; 

export default function ClientLayout({
  children,
  locale,
  dir,
  fontClass,
  messages, 
}: {
  children: ReactNode;
  locale: string;
  dir: Dir; 
  fontClass: string;
  messages: AbstractIntlMessages; 
}) {
  const pathname = usePathname();
  const isCheckout = pathname?.includes("/checkout");

  return (
    <html lang={locale} dir={dir} className={fontClass}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {isCheckout ? (
            children
          ) : (
            <>
              <ToastContainer
                position={dir === "rtl" ? "top-right" : "top-left"}
                autoClose={5000}
                rtl={dir === "rtl"}
                theme="colored"
                transition={Bounce}
              />
              <Header dir={dir} locale={locale} />
              {children}
              <ScrollCircle dir={dir} />
              <Footer />
            </>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}