import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Услуги ремонта | UHome",
  description:
    "Полный спектр работ по ремонту и отделке квартир и частных домов под ключ в Гродно. Черновая и чистовая отделка, дизайн-проект.",
};

export default function UslugiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
