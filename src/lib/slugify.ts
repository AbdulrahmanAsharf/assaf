/* eslint-disable @typescript-eslint/no-explicit-any */
// slugify.ts
import arTranslations from "@/locale/ar.json";
import enTranslations from "@/locale/en.json";
import { NavItem } from "@/types/nav";

export function slugify(str: string) {
  return str
    .toString()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase();
}

export function stableId(str: string, prefix: "c" | "p" | "s") {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return prefix + Math.abs(hash);
}

// ✅ الدالة الجديدة: يستخدم النصوص الأصلية من JSON
export function buildBilingualNavs(): NavItem[] {
  const arTranslationsData = (arTranslations as any).navs || [];
  const enTranslationsData = (enTranslations as any).navs || [];

  const navsData = arTranslationsData.map((arNav: any, i: number) => {
    const enNav = enTranslationsData[i] || { title: arNav.title, sub: [] };

    // ✅ استخدم النصوص الأصلية من JSON لكل لغة
    return {
      titleAr: arNav.title,                    // ✅ من ar.json
      titleEn: enNav?.title || arNav.title,    // ✅ من en.json
      
      // ✅ stableId من العربي (ثابت)
      stableId: stableId(arNav.title, "c"),

      // ✅ subAr: النصوص الأصلية من ar.json (عربي)
      subAr: (arNav.sub || []).map((s: string) => ({
        title: s,                    // ✅ من ar.json (عربي)
        stableId: stableId(s, "s"),  // ✅ stableId من العربي
      })),

      // ✅ subEn: النصوص الأصلية من en.json (خليط عربي/إنجليزي)
      subEn: (enNav.sub || arNav.sub || []).map((s: string, j: number) => ({
        title: enNav.sub?.[j] || arNav.sub?.[j] || s,  // ✅ من en.json أولاً، ثم ar.json
        stableId: stableId(arNav.sub?.[j] || s, "s"),  // ✅ stableId من العربي (ثابت)
      })),
    };
  });



  return navsData as NavItem[];
}