// src/components/SectionProducts.tsx
//import { getProductsByCategory } from "@/lib/getProducts";
import { getProductsByCategoryOrSlug } from "@/actions/getProducts";
import ProductCard from "@/components/ProductCard/ProductCard";

interface SectionProductsProps {
  title: string; // مثال: "الجديد" أو "جميع المنتجات"
  locale: string; // ar أو en
  limit?: number; // عدد المنتجات اللي هتظهر
}

export default async function SectionProducts({ title, locale, limit = 4 }: SectionProductsProps) {
  // استدعاء المنتجات من السيرفر حسب العنوان واللغة
  const products = await getProductsByCategoryOrSlug(title, locale);
console.log(products)
  // تحديد عدد المنتجات
  const limitedProducts = products.slice(0, limit);

  return (
    <section className="section-gap container mx-auto ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {limitedProducts.length > 0 ? (
          limitedProducts.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              stableId={p.stableId}
              image={p.imageUrl}
              titleAr={p.titleAr}
              titleEn={p.titleEn}
              price={p.price}
              oldprice={p.oldPrice}
              modelnumber={p.modelNumber}
              stock={p.stock}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            لا توجد منتجات في هذا القسم.
          </p>
        )}
      </div>
    </section>
  );
}
