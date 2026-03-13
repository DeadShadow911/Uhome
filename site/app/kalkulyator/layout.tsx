import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Стоимость ремонта квартиры Гродно 2025 — Калькулятор | UHome",
  description:
    "Узнайте стоимость ремонта квартиры в Гродно 2025: косметический, евроремонт, капитальный. Ориентировочный расчёт онлайн. Точная смета — после бесплатного замера.",
};

export default function KalkulyatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
