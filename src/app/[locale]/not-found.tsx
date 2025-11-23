// src/app/[locale]/not-found.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LocaleNotFound() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/ar") ? "ar" : "en";
  const isArabic = locale === "ar";

  const content = {
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

  const t = content[locale];

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f9fafb',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        textAlign: isArabic ? 'right' : 'left', 
        maxWidth: '700px', 
        width: '100%',
        direction: isArabic ? 'rtl' : 'ltr'
      }}>
        {/* Header: Logo + Number */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '30px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <div style={{ flexShrink: 0 }}>
            <Image 
              src="/icon/b7mx5Vp0dkXgh7M718NYszs9hmwKILfSRIemk0Fl (1).png" 
              alt="Logo" 
              width={250} 
              height={100}
              priority
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <h1 style={{ 
            fontSize: 'clamp(80px, 15vw, 120px)', 
            fontWeight: 800, 
            color: '#0a5068', 
            lineHeight: 1,
            letterSpacing: '-5px',
            margin: 0
          }}>
            410
          </h1>
        </div>

        {/* Content */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ 
            fontSize: 'clamp(32px, 5vw, 42px)', 
            fontWeight: 300, 
            color: '#d1d5db', 
            marginBottom: '30px',
            lineHeight: 1.4
          }}>
            {t.title}
          </h2>
          
          <p style={{ 
            fontSize: '20px', 
            color: '#4b5563', 
            marginBottom: '15px',
            fontWeight: 600
          }}>
            {t.subtitle}
          </p>
          
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280', 
            marginBottom: '50px',
            fontWeight: 400
          }}>
            {t.description}
          </p>
          
          <Link 
            href={`/${locale}`}
            style={{ 
              display: 'inline-block',
              padding: '16px 40px',
              background: '#0a5068',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '18px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#083d52';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0a5068';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {t.btnHome}
          </Link>
        </div>
      </div>
    </div>
  );
}