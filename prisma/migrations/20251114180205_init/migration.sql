-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('AR', 'EN', 'BOTH');

-- CreateEnum
CREATE TYPE "public"."MediaType" AS ENUM ('IMAGE');

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "stableId" TEXT,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubCategory" (
    "id" TEXT NOT NULL,
    "stableId" TEXT,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "stableId" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionAr" TEXT,
    "descriptionEn" TEXT,
    "oldPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "modelNumber" TEXT,
    "compositionAr" TEXT,
    "compositionEn" TEXT,
    "inspirationEn" TEXT,
    "inspirationAr" TEXT,
    "size" TEXT,
    "gender" TEXT,
    "warrantyAr" TEXT,
    "warrantyEn" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductMedia" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "public"."MediaType" NOT NULL,
    "language" "public"."Language" NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderProduct" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ProductCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_ProductSubCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductSubCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_stableId_key" ON "public"."Category"("stableId");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_stableId_key" ON "public"."SubCategory"("stableId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_stableId_key" ON "public"."Product"("stableId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "public"."User"("clerkId");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "public"."Order"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderProduct_orderId_productId_key" ON "public"."OrderProduct"("orderId", "productId");

-- CreateIndex
CREATE INDEX "_ProductCategories_B_index" ON "public"."_ProductCategories"("B");

-- CreateIndex
CREATE INDEX "_ProductSubCategories_B_index" ON "public"."_ProductSubCategories"("B");

-- AddForeignKey
ALTER TABLE "public"."SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductMedia" ADD CONSTRAINT "ProductMedia_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderProduct" ADD CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductCategories" ADD CONSTRAINT "_ProductCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductCategories" ADD CONSTRAINT "_ProductCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductSubCategories" ADD CONSTRAINT "_ProductSubCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductSubCategories" ADD CONSTRAINT "_ProductSubCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
