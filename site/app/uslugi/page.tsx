import Link from "next/link";
import { services } from "@/lib/mock-data";
import { Home, Building, Palette, Hammer, PaintBucket, Wrench } from "lucide-react";

const iconMap = {
  Home,
  Building,
  Palette,
  Hammer,
  PaintBucket,
  Wrench,
};

export default function UslugiPage() {
  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl lg:text-5xl">
          Услуги
        </h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          Полный спектр работ по ремонту и отделке квартир и частных домов под ключ
        </p>

        <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Home;
            return (
              <Link
                key={service.slug}
                href={`/uslugi/${service.slug}`}
                className="group flex flex-col rounded-xl border border-primary/10 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent">
                  <Icon className="size-8" />
                </div>
                <h2 className="font-heading text-xl font-semibold text-primary group-hover:text-accent">
                  {service.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-text-muted">{service.description}</p>
                <span className="mt-4 text-sm font-medium text-accent">Подробнее →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
