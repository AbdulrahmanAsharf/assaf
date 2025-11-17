import * as React from "react";

export const Hanger = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* الخطاف الدائري */}
    <path d="M12 2c1.5 0 2.5 1 2.5 2.5S13.5 7 12 7" />

    {/* العمود النازل من الخطاف */}
    <path d="M12 7v2" />

    {/* قاعدة الشماعة (مثلث مفتوح من تحت) */}
    <path d="M4 16l8-7 8 7H4z" />
  </svg>
);
