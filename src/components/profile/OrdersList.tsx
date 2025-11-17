/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/profile/OrdersList.tsx
"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getUserOrders } from "@/actions/order-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, SaudiRiyal, Codesandbox } from "lucide-react";

export default function OrdersList() {
  const t = useTranslations("orders");
  const locale = useLocale();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">{t("loading")}</p>;
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-25 ">
        <div className="rounded-full bg-indigo-50 p-15">
          <Codesandbox className="w-15 h-15 text-gray-400 " />
        </div>
        <h2 className="text-gray-400"> الأمنيات غالباً تتحقق !</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-4 container lg:px-60">
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>#{order.id.slice(-8)}</CardTitle>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString(
                    locale === "ar" ? "ar-EG" : "en-US",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-400 text-white dark:bg-blue-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                {t("completed")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {order.products.map((op: any) => (
                <div key={op.id} className="flex justify-between text-sm">
                  <span>
                    {locale === "ar" ? op.product.titleAr : op.product.titleEn} × {op.quantity}
                  </span>
                  <div className="flex items-center">
                    <span>{(op.product.price * op.quantity).toFixed(2)}</span>
                    <SaudiRiyal className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
              <div className="border-t pt-2 font-bold flex justify-between">
                <span>{t("total")}</span>
                <div className="flex items-center">
                  <span>
                    {order.products.reduce((sum: number, op: any) => sum + op.product.price * op.quantity, 0).toFixed(2)}
                  </span>
                  <SaudiRiyal className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}