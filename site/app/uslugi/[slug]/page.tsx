import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | UHome`,
    description: service.description,
  };
}

export default async function UslugaPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="mb-8 text-sm text-text-muted">
          <Link href="/" className="hover:text-accent">Главная</Link>
          <span className="mx-2">/</span>
          <Link href="/uslugi" className="hover:text-accent">Услуги</Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{service.title}</span>
        </nav>

        <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl lg:text-5xl">
          {service.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-text-muted">
          {service.description}
        </p>

        <div className="mt-8 max-w-3xl space-y-6 text-primary sm:mt-12">
          <p>
            Мы выполняем полный комплекс работ: от черновой отделки до финишных материалов.
            Все работы ведутся по согласованному проекту и смете.
          </p>
          <p>
            Сроки и стоимость рассчитываются индивидуально после замера объекта.
            Предоставляем гарантию на все виды работ.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 sm:mt-12">
          <Button asChild variant="primary">
            <Link href="/kalkulyator">Рассчитать стоимость</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/kontakty">Заказать звонок</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
