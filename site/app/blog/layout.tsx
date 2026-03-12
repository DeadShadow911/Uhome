import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог о ремонте | UHome",
  description:
    "Полезные статьи о ремонте квартир и домов, материалах и трендах в отделке. UHome — ремонт в Гродно.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
