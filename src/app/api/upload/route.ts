/* eslint-disable @typescript-eslint/no-explicit-any */
//assaf\src\app\api\upload\route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
console.log("📡 تم تحميل API /api/upload");
export async function POST(req: Request) {
  try {
    console.log("📩 طلب رفع جديد وصل إلى /api/upload");

    const { image } = await req.json();
    console.log("🖼️ تم استقبال الصورة؟", !!image);

    if (!image) {
      console.warn("⚠️ لم يتم إرسال أي صورة من العميل");
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    console.log("🚀 بدء رفع الصورة إلى Cloudinary...");
    const result = await cloudinary.uploader.upload(image, {
      folder: "عساف",
    });

    console.log("✅ تم رفع الصورة إلى Cloudinary:", result.secure_url);

    return NextResponse.json({ secure_url: result.secure_url });
  } catch (error: any) {
    console.error("❌ خطأ أثناء رفع الصورة إلى Cloudinary:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

