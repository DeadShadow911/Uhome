import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Отзывы клиентов | UHome",
  description:
    "Отзывы клиентов о работе UHome. Ремонт квартир и домов в Гродно — реальные истории и рекомендации.",
};

export default function OtzyvyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
