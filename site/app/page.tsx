import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBadgesSection } from "@/components/sections/TrustBadgesSection";
import { QuickEstimateSection } from "@/components/sections/QuickEstimateSection";
import { QualityBlock } from "@/components/sections/QualityBlock";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ContractSection } from "@/components/sections/ContractSection";
import { CTASection } from "@/components/sections/CTASection";
import { BlogSection } from "@/components/sections/BlogSection";

export const metadata: Metadata = {
  title: "Ремонт квартир в Гродно под ключ | Стоимость 2025 — UHome",
  description:
    "Ремонт квартир в Гродно под ключ: косметический, евроремонт, капитальный. Стоимость ремонта квартиры Гродно 2025 — актуальные цены. Бесплатный замер и смета за 2 дня. Гарантия 2 года.",
  openGraph: {
    title: "Ремонт квартир в Гродно под ключ | UHome",
    description: "Стоимость ремонта квартиры Гродно 2025. Отделка квартир под ключ. Гарантия 2 года.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PortfolioSection />
      <TrustBadgesSection />
      <QuickEstimateSection />
      <QualityBlock />
      <ServicesSection />
      <AdvantagesSection />
      <ReviewsSection />
      <ContractSection />
      <CTASection />
      <BlogSection />
    </main>
  );
}
