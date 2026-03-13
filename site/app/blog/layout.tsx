import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог о ремонте квартир в Гродно | Советы и цены 2025 — UHome",
  description:
    "Статьи о ремонте квартир в Гродно: стоимость, этапы, выбор подрядчика, материалы. Актуальные цены и советы от UHome.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
