import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | UHome",
  description:
    "Политика конфиденциальности сайта UHome. Порядок обработки и защиты персональных данных.",
};

export default function PolitikaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
