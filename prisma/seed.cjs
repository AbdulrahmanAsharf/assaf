/* eslint-disable @typescript-eslint/no-require-imports */
// prisma/seed.cjs
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const db = new PrismaClient();

// stableId function من slugify.ts
function stableId(str, prefix) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return prefix + Math.abs(hash);
}

async function main() {
  try {
    // قراءة JSON files
    const arPath = path.join(process.cwd(), "src/locale/ar.json");
    const enPath = path.join(process.cwd(), "src/locale/en.json");

    const ar = JSON.parse(fs.readFileSync(arPath, "utf-8"));
    const en = JSON.parse(fs.readFileSync(enPath, "utf-8"));

    const navsAr = ar.navs || [];
    const navsEn = en.navs || [];

    console.log("📝 حذف البيانات القديمة...");
    await db.productMedia.deleteMany({});
    await db.product.deleteMany({});
    await db.subCategory.deleteMany({});
    await db.category.deleteMany({});

    console.log(`📝 جاري إضافة ${navsAr.length} قسم...`);

    for (let i = 0; i < navsAr.length; i++) {
      const arItem = navsAr[i];
      const enItem = navsEn[i] || { title: arItem.title, sub: [] };

      await db.category.create({
        data: {
          nameAr: arItem.title,
          nameEn: enItem.title,
          stableId: stableId(arItem.title, "c"),
          subCategories: {
            create: (arItem.sub || []).map((s, idx) => ({
              nameAr: s,
              nameEn: (enItem.sub || [])[idx] || s,
              stableId: stableId(s, "s"),
            })),
          },
        },
      });

      console.log(`✅ ${arItem.title}`);
    }

    console.log("✅ تم إضافة الأقسام بنجاح");
  } catch (error) {
    console.error("❌ خطأ:", error.message);
    process.exit(1);
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });