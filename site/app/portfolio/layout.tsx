import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Портфолио работ | UHome Гродно",
  description:
    "Реализованные проекты по ремонту квартир и строительству домов в Гродно и области. Косметический и капитальный ремонт.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
