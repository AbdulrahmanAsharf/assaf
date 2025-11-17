"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { slugify } from "@/lib/slugify"; 

export default function Section3() {
    const locale = useLocale(); 

    const products = [
        {
            name: "الاكثر مبيعا - نساء ",
            titleAr: "الأكثر مبيعاً",
            titleEn: "Best Seller",
            image: "/img/Section3/1.webp",
            stableId: "c1359947731",
        },
        {
            name:"مجموعه اروقيت",
            titleAr: "مجموعة أروقيت",
            titleEn: "Arooqit Group",
            image: "/img/Section3/2.webp",
            stableId: "s1161866258",
        },
        {
            name:"اختيارت العطارين",
            titleAr: "اختبارت العطارين",
            titleEn: "اختبارت العطارين",
            image: "/img/Section3/3.webp",
            stableId: "c1225644666",
        },
        {
            name:"عناية الجسم",
            titleAr: "مستحضرات العناية",
            titleEn: "Care products",
            image: "/img/Section3/4.webp",
            stableId: "c2108008469",
        },
    ];

   return (
        <section className="section-gap">
            <div className="container">
                <div className="mt-15 mb-30  px-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {products.map((product, index) => {
                        const titleToSlug = locale === "ar" ? product.titleAr : product.titleEn || product.titleAr;
                        const titleSlug = slugify(titleToSlug);
                        const productStableId = product.stableId;
                        const productLink = `/${locale}/${titleSlug}/${productStableId}`;

                        return (
                            <Link
                                key={index}
                                href={productLink}
                                className="pb-2 flex flex-col relative w-full max-w-[300px] md:max-w-[250px] h-[200px] md:h-[280px] overflow-hidden group rounded-lg transition-all duration-300 ease-in-out z-0 hover:z-10"
                            >
                                <div
                                    className="relative w-full h-full overflow-hidden rounded-lg transition-all duration-300 ease-in-out group-hover:scale-105"
                                >
                                    <Image
                                        src={product.image}
                                        alt={`هدية ${locale === "ar" ? product.titleAr : product.titleEn}`}
                                        fill
                                        className="rounded-lg object-cover object-center"
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                                    />
                                </div>
                                <h2 className="pt-3 font-semibold  text-center ">
                                    {product.name}
                                </h2>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}