import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "UHome — Ремонт квартир и домов под ключ в Гродно",
  description:
    "Профессиональный ремонт квартир и частных домов под ключ в Гродно. Отделка с гарантией 5 лет. Рассчитайте стоимость онлайн.",
};
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CalculatorSection } from "@/components/sections/CalculatorSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CTASection } from "@/components/sections/CTASection";
import { BlogSection } from "@/components/sections/BlogSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <CalculatorSection />
      <ProcessSection />
      <ReviewsSection />
      <CTASection />
      <BlogSection />
    </main>
  );
}
