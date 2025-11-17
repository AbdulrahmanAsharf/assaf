// src/types/search.d.ts
export type ProductCard = {
  id: string;
  stableId: string | null;
  titleAr: string;
  titleEn: string;
  price: number;
  oldPrice: number;
  imageUrl: string;
  stock: number;
};

export type CategoryResult = {
  id: string;
  stableId: string | null;
  nameAr: string;
  nameEn: string;
};

export type SubCategoryResult = CategoryResult;

export type SearchResults = {
  products: ProductCard[];
  categories: CategoryResult[];
  subCategories: SubCategoryResult[];
  total: number;
  query: string;
};