// src/lib/search.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type SearchResults = {
  products: {
    id: string;
    stableId: string;
    imageUrl: string;
    titleAr: string;
    titleEn: string;
    price: number;
    oldPrice: number;
    modelNumber: string | null;
    stock: number;
  }[];
  categories: {
    id: string;
    stableId: string | null;
    nameAr: string;
    nameEn: string;
  }[];
  subCategories: {
    id: string;
    stableId: string | null;
    nameAr: string;
    nameEn: string;
  }[];
  total: number;
  query: string;
};

export async function searchEverything(
  query: string,
  locale: "ar" | "en" = "ar",
  limit = 20
): Promise<SearchResults> {
  const sanitized = query.trim();
  if (!sanitized) {
    return {
      products: [],
      categories: [],
      subCategories: [],
      total: 0,
      query: "",
    };
  }

    console.log("Search locale:", locale);


  // البحث في كل الحقول
  const [products, categories, subCategories] = await Promise.all([
    // 1. المنتجات
    prisma.product.findMany({
      where: {
        OR: [
          { titleAr: { contains: sanitized, mode: "insensitive" } },
          { titleEn: { contains: sanitized, mode: "insensitive" } },
          { descriptionAr: { contains: sanitized, mode: "insensitive" } },
          { descriptionEn: { contains: sanitized, mode: "insensitive" } },
          { modelNumber: { contains: sanitized, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        stableId: true,
        imageUrl: true,
        titleAr: true,
        titleEn: true,
        price: true,
        oldPrice: true,
        modelNumber: true,
        stock: true,
      },
      take: limit,
      orderBy: { price: "asc" },
    }),

    // 2. التصنيفات
    prisma.category.findMany({
      where: {
        OR: [
          { nameAr: { contains: sanitized, mode: "insensitive" } },
          { nameEn: { contains: sanitized, mode: "insensitive" } },
        ],
      },
      select: { id: true, stableId: true, nameAr: true, nameEn: true },
      take: 10,
    }),

    // 3. التصنيفات الفرعية
    prisma.subCategory.findMany({
      where: {
        OR: [
          { nameAr: { contains: sanitized, mode: "insensitive" } },
          { nameEn: { contains: sanitized, mode: "insensitive" } },
        ],
      },
      select: { id: true, stableId: true, nameAr: true, nameEn: true },
      take: 10,
    }),
  ]);

  return {
    products,
    categories,
    subCategories,
    total: products.length + categories.length + subCategories.length,
    query: sanitized,
  };
}
