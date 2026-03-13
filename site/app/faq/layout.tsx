import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Частые вопросы о ремонте квартир в Гродно — UHome",
  description:
    "Ответы на вопросы о ремонте квартир в Гродно: стоимость, сроки, гарантия, материалы. UHome — надёжный подрядчик.",
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
