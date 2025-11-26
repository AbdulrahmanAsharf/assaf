/* eslint-disable @typescript-eslint/no-explicit-any */
// actions/delete-account.ts
"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteAccountAction() {
  // لازم await عشان auth() بيرجع Promise
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "المستخدم غير مسجل الدخول" };
  }

  try {
    // 1. حذف الحساب من Clerk
    const clerkResponse = await fetch(
      `https://api.clerk.com/v1/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!clerkResponse.ok) {
      const errorText = await clerkResponse.text();
      throw new Error(`فشل حذف الحساب من Clerk: ${errorText}`);
    }

    // 2. حذف من Prisma فورًا (مهم جدًا!)
    try {
      await db.user.delete({
        where: { clerkId: userId },
      });
    } catch (prismaError) {
      console.warn("المستخدم مش موجود في Prisma أو اتحذف قبل كده:", prismaError);
      // مفيش مشكلة لو ما اتحذفش من Prisma، المهم Clerk اتحذف
    }

    revalidatePath("/");
    return { success: true };

  } catch (error: any) {
    console.error("خطأ كامل في حذف الحساب:", error);
    return {
      success: false,
      error: error.message || "فشل حذف الحساب، حاول مرة أخرى",
    };
  }
}