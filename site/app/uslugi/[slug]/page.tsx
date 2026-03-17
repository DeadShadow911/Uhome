import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/mock-data";
import { ServiceDetailGallery } from "@/components/uslugi/ServiceDetailGallery";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const title = `${service.title} в Гродно — UHome`;
  const url = `/uslugi/${slug}`;
  const description = service.fullDescription
    ? service.fullDescription.slice(0, 155).replace(/\s+$/, "") + "…"
    : service.description;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: service.images?.slice(0, 1).map((imgUrl) => ({ url: imgUrl, width: 1200, height: 630, alt: service.title })),
    },
    alternates: { canonical: url },
  };
}

export default async function UslugaPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  return (
    <main className="min-h-screen">
      <ServiceDetailGallery service={service} />
    </main>
  );
}
