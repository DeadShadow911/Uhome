import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Услуги ремонта квартир в Гродно под ключ — UHome",
  description:
    "Ремонт квартир в Гродно под ключ: черновая и чистовая отделка, евроремонт, капитальный ремонт. Полный спектр работ. Бесплатный замер.",
};

export default function UslugiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
