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
  const title = `${item.title} — UHome Гродно`;
  const description = item.intro
    ? `${item.type}, ${item.area}. ${item.intro.slice(0, 155)}${item.intro.length > 155 ? "…" : ""}`
    : `${item.type}, ${item.area}. Реализованный проект ремонта в Гродно.`;
  const url = `/portfolio/${slug}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: item.image ? [{ url: item.image, width: 1200, height: 630, alt: item.title }] : undefined,
    },
    alternates: { canonical: url },
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
