import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { Analytics } from "@/components/analytics/Analytics";
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

const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1326992945905023";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Meta Pixel Code — по инструкции Meta в head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <Header />
        {children}
        <Footer />
        <StickyCTA />
        <Analytics />
      </body>
    </html>
  );
}
