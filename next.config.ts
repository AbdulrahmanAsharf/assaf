import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["flagcdn.com", "res.cloudinary.com"], // ضيف cloudinary هنا
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
