// src/actions/getProducts.ts
import { db } from "@/lib/prisma";

export async function getProductsByCategoryOrSlug(
  slug: string,
  locale?: string  // ✅ أضفنا locale parameter
) {
  const decodedSlug = decodeURIComponent(slug);
  const cleanSlug = decodedSlug.replace(/-/g, " ").trim();
  
  console.log("🔍 getProducts Debug:");
  console.log("Original slug:", slug);
  console.log("Clean slug:", cleanSlug);
  console.log("Locale:", locale); // ✅ استخدمنا locale

  // ✅ التحقق من الصفحات الخاصة
  if (cleanSlug === "الجديد" || cleanSlug === "new") {
    console.log("✅ Fetching new arrivals...");
    return await db.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  }

  if (cleanSlug === "جميع المنتجات" || cleanSlug === "all products") {
    console.log("✅ Fetching all products...");
    return await db.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  // باقي الكود (كاتيجوري، ساب)...
  const searchKey = cleanSlug;

  const category = await db.category.findFirst({
    where: {
      OR: [{ nameAr: searchKey }, { nameEn: searchKey }],
    },
    include: { products: true },
  });

  const subCategory = await db.subCategory.findFirst({
    where: {
      OR: [{ nameAr: searchKey }, { nameEn: searchKey }],
    },
    include: { products: true },
  });

  if (category?.products?.length) return category.products;
  if (subCategory?.products?.length) return subCategory.products;

  return [];
}