import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "UHome — Ремонт квартир и домов под ключ в Гродно",
  description:
    "Профессиональный ремонт квартир и частных домов под ключ в Гродно. Отделка с гарантией 2 года. Рассчитайте стоимость онлайн.",
};
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { QuickEstimateSection } from "@/components/sections/QuickEstimateSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CTASection } from "@/components/sections/CTASection";
import { BlogSection } from "@/components/sections/BlogSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AdvantagesSection />
      <ServicesSection />
      <PortfolioSection />
      <QuickEstimateSection />
      <ProcessSection />
      <ReviewsSection />
      <CTASection />
      <BlogSection />
    </main>
  );
}
