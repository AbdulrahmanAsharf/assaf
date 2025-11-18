import Breadcrumbs from "@/components/Breadcrumbs"
import Profileindex from "@/components/profile"
import { Codesandbox } from "lucide-react";

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
             <div className="flex flex-col items-center gap-5 py-25 ">
                <div className="rounded-full bg-indigo-50 p-15">
                    <Codesandbox className="w-15 h-15 text-gray-400 " />
                </div>
                <h2 className="text-gray-400"> الأمنيات غالباً تتحقق !</h2>
            </div>
        </div>
    )
}