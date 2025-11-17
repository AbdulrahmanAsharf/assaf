// types/nav.ts


export type NavItem = {
  titleAr: string;
  titleEn: string;
  stableId: string;
  subAr: Array<{ title: string; stableId: string }>;
  subEn: Array<{ title: string; stableId: string }>;
}
