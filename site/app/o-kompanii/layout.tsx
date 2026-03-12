import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании UHome | Гродно",
  description:
    "UHome — компания с многолетним опытом на рынке ремонта и отделки в Гродно. Ремонт квартир и строительство домов под ключ.",
};

export default function OKompaniiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
