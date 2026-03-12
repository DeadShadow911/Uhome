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
    default: "UHome — Ремонт квартир и домов под ключ в Гродно",
    template: "%s | UHome",
  },
  description:
    "Профессиональный ремонт квартир и частных домов под ключ в Гродно. Отделка с гарантией 2 года. Рассчитайте стоимость онлайн.",
  openGraph: {
    title: "UHome — Ремонт квартир и домов под ключ",
    description: "Профессиональный ремонт квартир и частных домов в Гродно. Гарантия 2 года.",
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
