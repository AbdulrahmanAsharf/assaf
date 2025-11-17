// src/app/[locale]/success/page.tsx
"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { CheckCircle, SaudiRiyal } from "lucide-react";
import Image from "next/image";

export default function SuccessPage() {
    const { locale } = useParams() as { locale: string };
    const searchParams = useSearchParams();
    const amount = searchParams.get("amount") || "0";
    const t = useTranslations("success");
    const isRtl = locale === "ar";

    return (
        <div className="pt-35 mt-6">

            <div className="min-h-screen bg-gray-50 py-10 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* بطاقة النجاح */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        {/* أيقونة النجاح */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <CheckCircle className="w-20 h-20 text-green-500" />
                                <div className="absolute inset-0 animate-ping">
                                    <CheckCircle className="w-20 h-20 text-green-300 opacity-75" />
                                </div>
                            </div>
                        </div>

                        {/* العنوان */}
                        <h1 className="text-3xl font-bold text-gray-800 mb-3">
                            {t("title")}
                        </h1>

                        <p className="text-lg text-gray-600 mb-6">
                            {t("subtitle")}
                        </p>

                        {/* تفاصيل الطلب */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-start">

                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-medium">{t("totalAmount")}</span>
                                <div className="flex items-center text-green-600 gap-0.5">
                                    <h2 className="text-xl font-bold ">
                                        {amount}
                                    </h2>
                                    <SaudiRiyal className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* شعار المتجر */}
                        <div className="flex justify-center mb-8">
                            <Image
                                src="/icon/b7mx5Vp0dkXgh7M718NYszs9hmwKILfSRIemk0Fl (1).png"
                                alt="Logo"
                                width={100}
                                height={100}
                                className="rounded-lg"
                            />
                        </div>

                        {/* الأزرار */}
                        <div className={`flex ${isRtl ? "flex-row-reverse" : "flex-row"} gap-4 justify-center`}>
                            <Button asChild className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-xl font-bold">
                                <Link href="/">{t("continueShopping")}</Link>
                            </Button>
                            <Button asChild variant="outline" className="px-8 py-6 rounded-xl font-medium">
                                <Link href="/orders">{t("viewOrders")}</Link>
                            </Button>
                        </div>
                    </div>

                    {/* رسالة شكر */}
                    <p className="text-center text-sm text-gray-500 mt-8">
                        {t("thankYou")}
                    </p>
                </div>
            </div>
        </div>

    );
}