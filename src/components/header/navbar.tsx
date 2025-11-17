"use client";

import { Link } from "@/i18n/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { slugify } from "@/lib/slugify";
import { useLocale } from "next-intl";
import { NavItem } from "@/types/nav";

export default function Navbar({
  dir,
  scrollTextColor,
  //nav,
  navs,
}: {
  dir: "rtl" | "ltr";
  scrollTextColor: string;
  ///nav: string;
  navs: NavItem[];
}) {
  const locale = useLocale();

  return (
    <NavigationMenu
      viewport={false}
      className={`font-medium ${scrollTextColor} relative hidden  z-50 lg:block`}
    >
      <NavigationMenuList className="flex flex-wrap" dir={dir}>
        {navs.map((navItem, index) => {
          const title = locale === "ar" ? navItem.titleAr : navItem.titleEn;
          const titleSlug = slugify(title);
          const subs = locale === "ar" ? navItem.subAr : navItem.subEn;

          return (
            <NavigationMenuItem key={index} className="list-none">
              {subs.length > 0 ? (
                <>
                  <NavigationMenuTrigger className={scrollTextColor}>
                    {/* ✅ أضف locale */}
                    <Link href={`/${titleSlug}/${navItem.stableId}`}>
                      {title}
                    </Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white text-neutral-900 border shadow-md rounded-b-md z-90">
                    <ul className="grid w-[200px] gap-3 p-0 m-0">
                      {subs.map((item, i) => {
                        const subSlug = slugify(item.title);
                        return (
                          <li key={i}>
                            <NavigationMenuLink asChild>
                              {/* ✅ أضف locale */}
                              <Link
                                href={`/${subSlug}/${item.stableId}`}
                                className="w-full px-3 py-2 hover:bg-gray-50"
                              >
                                {item.title} {/* ✅ النص الأصلي من JSON */}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  {/* ✅ أضف locale */}
                  <Link href={`/${titleSlug}/${navItem.stableId}`}>
                    <span className={scrollTextColor}>{title}</span>
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}