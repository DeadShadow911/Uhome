import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты | UHome — ремонт в Гродно",
  description:
    "Свяжитесь с UHome для расчёта стоимости ремонта и консультации. Телефон, email, адрес в Гродно. Форма обратной связи.",
};

export default function KontaktyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
