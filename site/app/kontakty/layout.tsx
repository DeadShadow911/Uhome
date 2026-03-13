import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты UHome — Ремонт квартир Гродно",
  description:
    "Заказать ремонт квартир в Гродно: телефон, WhatsApp, Telegram. Бесплатный замер и смета. Адрес и форма обратной связи.",
};

export default function KontaktyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
