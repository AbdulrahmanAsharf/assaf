"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { slugify } from "@/lib/slugify";

export default function Section2() {
    const locale = useLocale();

    const products = [
        {
            name: "مجموعه وايلد",
            titleAr: "مجموعة وايلد كولت",
            titleEn: "Wild-Colt Group",
            image: "/img/Section2/1.webp",
            stableId: "s524010075",
        },
        {
            name: "للنساء",
            titleAr: "للنساء",
            titleEn: "For Women",
            image: "/img/Section2/2.webp",
            stableId: "s207265479",
        },
        {
            name: "اللرجال",
            titleAr: "عطور رجالية",
            titleEn: "Men's perfumes",
            image: "/img/Section2/3.webp",
            stableId: "s1243589328",
        },
        {
            name: "هدايا عساف",
            titleAr: "فن الاهداء",
            titleEn: "The art of dedication",
            image: "/img/Section2/4.webp",
            stableId: "c1608460143",
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