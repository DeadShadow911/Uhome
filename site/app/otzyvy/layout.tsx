import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Отзывы о ремонте квартир в Гродно — UHome",
  description:
    "Реальные отзывы клиентов о ремонте квартир в Гродно. Рекомендации и истории от заказчиков UHome.",
};

export default function OtzyvyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
