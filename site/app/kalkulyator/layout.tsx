import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Быстрый расчёт стоимости ремонта | UHome",
  description:
    "Ориентировочный расчёт стоимости ремонта квартиры или дома в Гродно. Точная смета — после бесплатного замера.",
};

export default function KalkulyatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
