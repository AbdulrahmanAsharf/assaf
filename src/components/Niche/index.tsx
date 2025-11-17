

import { useTranslations } from "next-intl";
import SectionProducts from "../SectionProducts";
import Image from "next/image";


export default function Niche({ params }: { params: { locale: string } }) {
    const t = useTranslations("Section");
    const { locale } = params;

    return (
        <section className="section-gap  mx-auto">
            <div className="container">
                <div className="w-full">
                    <Image
                        alt="pinword"
                        src="/img/EDFuIp8Yfba8I46WIPj06gNPrH6me8Cz1KTWGv3d.webp"
                        width={1200}
                        height={800}
                        className="img"
                    />
                </div>
                <div className="menu text-center pt-15">
                    <h1 className="font-semibold text-4xl">{t("Niche")}</h1>
                </div>
                <SectionProducts title={locale === "ar" ? "مجموعة النيش" : "Niche Group"} locale={locale} limit={3} />
            </div>

        </section>
    );
}

