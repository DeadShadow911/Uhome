import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Портфолио ремонта квартир в Гродно — UHome",
  description:
    "Реализованные проекты по ремонту квартир в Гродно: евроремонт, капитальный ремонт, отделка под ключ. Фото до и после.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
