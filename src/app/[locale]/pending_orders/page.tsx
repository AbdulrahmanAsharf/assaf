import Breadcrumbs from "@/components/Breadcrumbs"
import Profileindex from "@/components/profile"

export default async function PendingOrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";
    const crumbs = [{ title: locale === "ar" ? "حسابي" : "Profile" }]

    return (
        <div className="pt-35 mt-10" dir={dir}>
            <Breadcrumbs crumbs={crumbs} />
            <Profileindex />
        </div>
    )
}