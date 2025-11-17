/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth, createClerkClient } from "@clerk/nextjs/server";

// تهيئة ClerkClient يدويًا
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function deleteAccountAction() {
  try {
    // جلب بيانات المستخدم من auth()
    const authData = await auth();
    const userId = authData?.userId;

    if (!userId) {
      return { success: false, error: "المستخدم غير مصدق" };
    }

    // حذف الحساب باستخدام Clerk Admin API
    await clerkClient.users.deleteUser(userId);

    return { success: true };
  } catch (error: any) {
    console.error("خطأ في حذف الحساب:", error);
    return { success: false, error: error.message || "خطأ في حذف الحساب" };
  }
}