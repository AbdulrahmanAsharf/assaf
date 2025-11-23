// src/app/[locale]/not-found.tsx

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - الصفحة غير موجودة | عساف للعطور",
  description: "الصفحة المطلوبة غير موجودة في موقع عساف للعطور",
};

// نستقبل الـ locale من الـ params (الطريقة الصحيحة في App Router)
export default function NotFound({ params }: { params: { locale: string } }) {
  const locale = params?.locale || "ar";
  const isAr = locale === "ar";

  const t = {
    ar: {
      title: "نأسف، الرابط غير موجود",
      subtitle: "الرابط المطلوب غير موجود.",
      description: "من فضلك حاول مرة أخرى أو تواصل مع الدعم الفني",
      btnHome: "الذهاب للصفحة الرئيسية",
    },
    en: {
      title: "Sorry, Link Not Found",
      subtitle: "The requested link does not exist.",
      description: "Please try again or contact technical support",
      btnHome: "Go to Home Page",
    },
  };

  const content = isAr ? t.ar : t.en;

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9fafb",
        padding: "20px",
        fontFamily: "'Tajawal', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: isAr ? "right" : "left",
          maxWidth: "700px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <Image
              src="/icon/b7mx5Vp0dkXgh7M718NYszs9hmwKILfSRIemk0Fl (1).png"
              alt="عساف للعطور"
              width={250}
              height={100}
              priority
            />
          </div>
          <h1
            style={{
              fontSize: "clamp(80px, 15vw, 120px)",
              fontWeight: 800,
              color: "#0a5068",
              lineHeight: 1,
              letterSpacing: "-5px",
              margin: 0,
            }}
          >
            404
          </h1>
        </div>

        <div style={{ marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 42px)",
              fontWeight: 300,
              color: "#d1d5db",
              marginBottom: "30px",
              lineHeight: 1.4,
            }}
          >
            {content.title}
          </h2>

          <p
            style={{
              fontSize: "20px",
              color: "#4b5563",
              marginBottom: "15px",
              fontWeight: 600,
            }}
          >
            {content.subtitle}
          </p>

          <p
            style={{
              fontSize: "18px",
              color: "#6b7280",
              marginBottom: "50px",
              fontWeight: 400,
            }}
          >
            {content.description}
          </p>

          <Link
            href={`/${locale}`}
            style={{
              display: "inline-block",
              padding: "16px 40px",
              background: "#0a5068",
              color: "white",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "18px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(10,80,104,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#083d52";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#0a5068";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {content.btnHome}
          </Link>
        </div>
      </div>
    </div>
  );
}