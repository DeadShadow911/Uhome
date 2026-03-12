import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Частые вопросы | UHome",
  description:
    "Ответы на популярные вопросы о ремонте квартир и домов, сроках, гарантии и наших услугах. UHome Гродно.",
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
