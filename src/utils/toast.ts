// utils/toast.ts
import { toast, Bounce } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";

export const useToast = () => {
  const locale = useLocale();
  const t = useTranslations("toast");
  const dir = locale === "ar" ? "rtl" : "ltr";
  const position = dir === "rtl" ? "top-right" : "top-left";

  const showToast = {
    success: (key: string) => {
      const message = t(key);
      toast.success(message, {
        position,
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
        className: "toast-responsive", 
      });
    },

    error: (key: string) => {
      const message = t(key);
      toast.error(message, {
        position,
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
        className: "toast-responsive",
      });
    },

    info: (key: string) => {
      const message = t(key);
      toast.info(message, {
        position,
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
        className: "toast-responsive",
      });
    },
    raw: {
      success: (msg: string) => toast.success(msg, { position, autoClose: 3000, theme: "colored" }),
      error: (msg: string) => toast.error(msg, { position, autoClose: 3000, theme: "colored" }),
      info: (msg: string) => toast.info(msg, { position, autoClose: 3000, theme: "colored" }),
    },
  };

  return showToast;
};