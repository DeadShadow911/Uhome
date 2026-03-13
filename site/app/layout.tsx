import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Ремонт квартир в Гродно под ключ | Стоимость 2025 — UHome",
    template: "%s | UHome Гродно",
  },
  description:
    "Ремонт квартир в Гродно под ключ: косметический, евроремонт, капитальный. Стоимость ремонта квартиры Гродно 2025 — актуальные цены. Бесплатный замер и смета за 2 дня. Гарантия 2 года.",
  keywords: ["ремонт квартир Гродно", "ремонт квартир в Гродно под ключ", "стоимость ремонта квартиры Гродно 2025", "отделка квартир Гродно", "евроремонт Гродно"],
  openGraph: {
    title: "Ремонт квартир в Гродно под ключ | UHome",
    description: "Стоимость ремонта квартиры Гродно 2025. Профессиональная отделка под ключ. Гарантия 2 года. Бесплатный замер.",
    siteName: "UHome",
    locale: "ru_BY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <Header />
        {children}
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
