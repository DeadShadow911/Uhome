import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBadgesSection } from "@/components/sections/TrustBadgesSection";
import { QuickEstimateSection } from "@/components/sections/QuickEstimateSection";
import { QualityBlock } from "@/components/sections/QualityBlock";
import { ServicesIntroSection } from "@/components/sections/ServicesIntroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ContractSection } from "@/components/sections/ContractSection";
import { CTASection } from "@/components/sections/CTASection";
import { BlogSection } from "@/components/sections/BlogSection";

export const metadata: Metadata = {
  title: "UHome — Ремонт квартир и домов под ключ в Гродно",
  description:
    "Профессиональный ремонт квартир и частных домов под ключ в Гродно. Отделка с гарантией 2 года. Рассчитайте стоимость онлайн.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TrustBadgesSection />
      <QuickEstimateSection />
      <QualityBlock />
      <ServicesIntroSection />
      <ServicesSection />
      <PortfolioSection />
      <AdvantagesSection />
      <ProcessSection />
      <ReviewsSection />
      <ContractSection />
      <CTASection />
      <BlogSection />
    </main>
  );
}
