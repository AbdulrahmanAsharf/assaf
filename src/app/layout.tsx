
import type { Metadata } from "next";
import "./[locale]/globals.css";

export const metadata: Metadata = {
  title: "عساف للعطور - 404",
  description: "الصفحة غير موجودة",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}