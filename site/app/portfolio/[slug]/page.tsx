import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioItems } from "@/lib/mock-data";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolioItems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} | UHome Портфолио`,
    description: item.description
      ? `${item.type} — ${item.area}. ${item.description.slice(0, 150)}...`
      : `${item.type} — ${item.area}. Реализованный проект UHome в Гродно.`,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);

  if (!item) notFound();

  return (
    <main className="min-h-screen">
      <PortfolioGallery item={item} />
    </main>
  );
}
