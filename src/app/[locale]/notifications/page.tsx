// src/app/[locale]/notifications/page.tsx

import Breadcrumbs from "@/components/Breadcrumbs";
import Profileindex from "@/components/profile";

export default async function NotificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";

  const crumbs = [
    {
      title: locale === "ar" ? "حسابي" : "Profile",
      href: `/${locale}/profile`,
    },
    {
      title: locale === "ar" ? "الإشعارات" : "Notifications",
    },
  ];

  return (
    <div className="pt-20 lg:pt-35 mt-10" dir={dir}>
      <Breadcrumbs crumbs={crumbs} />
      <div className="container mx-auto px-4">
        <Profileindex />
      </div>
    </div>
  );
}