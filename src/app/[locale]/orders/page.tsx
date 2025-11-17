// src/app/[locale]/profile/orders/page.tsx
import Breadcrumbs from "@/components/Breadcrumbs";
import Profileindex from "@/components/profile";
import OrdersList from "@/components/profile/OrdersList";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";

  const crumbs = [
    { title: locale === "ar" ? "حسابي" : "My Account", href: "/profile" },
    { title: locale === "ar" ? "طلباتي" : "My Orders" },
  ];

  return (
    <div className="pt-20 lg:pt-35 mt-10" dir={dir}>
        <Breadcrumbs crumbs={crumbs} />
          <Profileindex />
          <OrdersList />
    </div>
  );
}