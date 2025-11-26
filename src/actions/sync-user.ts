/* eslint-disable @typescript-eslint/no-explicit-any */
// actions/user-actions.ts
"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// === 1. مزامنة المستخدم من Clerk إلى Prisma (للاستخدام في أي مكان) ===
export async function syncUserToPrisma() {
  const clerkUser = await currentUser();
  if (!clerkUser) return { success: false, error: "غير مسجل الدخول" };

  const primaryEmail = clerkUser.emailAddresses.find(
    e => e.id === clerkUser.primaryEmailAddressId
  )?.emailAddress;

  await db.user.upsert({
    where: { clerkId: clerkUser.id },
    update: {
      email: primaryEmail ?? null,
      firstName: clerkUser.firstName ?? null,
      lastName: clerkUser.lastName ?? null,
      imageUrl: clerkUser.imageUrl ?? null,
      // لو عندك unsafeMetadata زي phone, sex, birthday
      // هتضيفها هنا من clerkUser.unsafeMetadata
    },
    create: {
      clerkId: clerkUser.id,
      email: primaryEmail ?? null,
      firstName: clerkUser.firstName ?? null,
      lastName: clerkUser.lastName ?? null,
      imageUrl: clerkUser.imageUrl ?? null,
    },
  });

  revalidatePath("/");
  return { success: true };
}

// === 2. حذف الحساب من Clerk + Prisma (للزر الأحمر) ===
export async function deleteAccountAction() {
  const clerkUser = await currentUser();
  if (!clerkUser) return { success: false, error: "غير مسجل الدخول" };

  try {
    // حذف من Clerk
    const res = await fetch(`https://api.clerk.com/v1/users/${clerkUser.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("فشل حذف الحساب من Clerk");

    // حذف من Prisma (لو الـ webhook ما اشتغلش)
    await db.user.delete({ where: { clerkId: clerkUser.id } }).catch(() => {});

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "فشل حذف الحساب" };
  }
}