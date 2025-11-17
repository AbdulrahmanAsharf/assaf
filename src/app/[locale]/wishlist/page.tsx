import Breadcrumbs from "@/components/Breadcrumbs"
import Profileindex from "@/components/profile"
import WishlistContent from "@/components/wishlist"
import { use } from "react";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default function WishlistPage({ params }: Props) {
  const { locale } = use(params);
    const dir = locale === "ar" ? "rtl" : "ltr"
    const crumbs = [
        {
            title: locale === "ar" ? "حسابي" : "Profile",
            href: "/profile"   
        },
        {
            title: locale === "ar" ? "الأمنيات" : "Wishlist"
        }
    ]

    return (
        <div className="pt-20 lg:pt-35 mt-10" dir={dir}>
            <Breadcrumbs crumbs={crumbs} />
            <Profileindex />
            <div className="container px-60 pt-6">
                <h1 className="font-semibold text-xl">الامنيات</h1>
            </div>
            <div className='w-full'>
                <WishlistContent />
            </div>
        </div>
    )
}