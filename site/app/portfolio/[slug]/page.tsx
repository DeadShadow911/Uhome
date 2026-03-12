import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { portfolioItems } from "@/lib/mock-data";

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
    description: `${item.type} — ${item.area}. Реализованный проект UHome в Гродно.`,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);

  if (!item) notFound();

  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="mb-8 text-sm text-text-muted">
          <Link href="/" className="hover:text-accent">Главная</Link>
          <span className="mx-2">/</span>
          <Link href="/portfolio" className="hover:text-accent">Портфолио</Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{item.title}</span>
        </nav>

        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-xl lg:aspect-[4/3]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
              {item.title}
            </h1>
            <p className="mt-4 text-text-muted">{item.type} • {item.area}</p>
            <p className="mt-8 text-primary">
              {item.beforeAfter
                ? "В этом проекте мы выполнили полный комплекс работ: черновую и чистовую отделку, замену коммуникаций, установку материалов. Объект сдан в срок с гарантией."
                : "Проект включал разработку дизайн-проекта и полную реализацию. Все материалы подобраны в соответствии с пожеланиями заказчика."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
