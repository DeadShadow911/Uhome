import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании UHome — Ремонт квартир в Гродно",
  description:
    "UHome — компания с опытом на рынке ремонта квартир в Гродно. Отделка под ключ, гарантия 2 года, прозрачная смета.",
};

export default function OKompaniiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
