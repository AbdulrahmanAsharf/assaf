// src/actions/order-actions.ts
"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function getPrismaUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("غير مصرح");

  return await db.user.upsert({
    where: { clerkId: clerkUser.id },
    update: {
      email: clerkUser.emailAddresses[0]?.emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
    },
    create: {
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
    },
  });
}

// حفظ الطلب

export async function createOrder(
  products: { productId: string; quantity: number }[],
  locale: "ar" | "en" = "ar" // ← أضف الـ locale هنا
) {
  const user = await getPrismaUser();

  // 1. جيب المنتجات وتأكد إن الكمية متوفرة
  const productIds = products.map((p) => p.productId);
  const dbProducts = await db.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, stock: true, titleAr: true, titleEn: true },
  });

  // 2. تحقق من المخزون قبل أي حاجة
  for (const item of products) {
    const product = dbProducts.find((p) => p.id === item.productId);
    if (!product) throw new Error(`المنتج غير موجود: ${item.productId}`);
    if (product.stock < item.quantity) {
      throw new Error(
        locale === "ar"
          ? `الكمية المطلوبة غير متوفرة لـ "${
              product.titleAr || product.titleEn
            }" (متوفر: ${product.stock})`
          : `Not enough stock for "${
              product.titleEn || product.titleAr
            }" (available: ${product.stock})`
      );
    }
  }

  // 3. ابدأ Transaction عشان كل حاجة تتم أو مفيش حاجة تتم (أمان 100%)
  const order = await db.$transaction(async (tx) => {
    // أنشئ الطلب
    const newOrder = await tx.order.create({
      data: {
        userId: user.id,
        products: {
          create: products.map((p) => ({
            productId: p.productId,
            quantity: p.quantity,
          })),
        },
      },
      include: {
        products: {
          include: {
            product: {
              select: {
                id: true,
                titleAr: true,
                titleEn: true,
                price: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    // 4. اقلل المخزون لكل منتج
    for (const item of products) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity, 
          },
        },
      });
    }

    return newOrder;
  });

  revalidatePath("/[locale]/orders");
  revalidatePath("/[locale]/products/[id]"); 
  return order;
}

// جلب طلبات المستخدم
export async function getUserOrders() {
  const user = await getPrismaUser();

  return await db.order.findMany({
    where: { userId: user.id },
    include: {
      products: {
        include: {
          product: {
            select: {
              id: true,
              titleAr: true,
              titleEn: true,
              price: true,
              imageUrl: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// جلب طلب واحد
export async function getOrderById(orderId: string) {
  const user = await getPrismaUser();

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      products: {
        include: {
          product: {
            select: {
              id: true,
              titleAr: true,
              titleEn: true,
              price: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  if (!order || order.userId !== user.id) {
    throw new Error("الطلب غير موجود أو لا تملكه");
  }

  return order;
}
