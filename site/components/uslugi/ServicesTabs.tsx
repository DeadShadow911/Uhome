"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Building, Building2, Hammer, PaintBucket, Wrench, Flame, Car, Tent, TreePine, ArrowRight } from "lucide-react";
import type { ServiceItem, ServiceCategory } from "@/lib/mock-data";

const iconMap = {
  Home,
  Building,
  Building2,
  Hammer,
  PaintBucket,
  Wrench,
  Flame,
  Car,
  Tent,
  TreePine,
};

const CATEGORIES: { id: ServiceCategory; label: string }[] = [
  { id: "remont", label: "Ремонт и отделка" },
  { id: "stroitelstvo", label: "Строительство" },
];

type Props = {
  services: ServiceItem[];
  className?: string;
};

export function ServicesTabs({ services, className = "" }: Props) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("remont");
  const filteredServices = services.filter((s) => (s.category ?? "remont") === activeCategory);

  return (
    <div className={className}>
      <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeCategory === cat.id
                ? "bg-primary text-white shadow-md"
                : "bg-white text-primary border border-primary/15 hover:border-primary/30 hover:shadow-sm"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap] || Home;
          const coverImage = service.images?.[0];
          return (
            <Link
              key={service.slug}
              href={`/uslugi/${service.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/20"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-primary/5">
                {coverImage ? (
                  <Image
                    src={coverImage}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/5">
                    <Icon className="size-16 text-primary/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-md opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                  <ArrowRight className="size-5" />
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="mb-3 inline-flex rounded-lg bg-cta/10 p-2.5 text-cta">
                  <Icon className="size-6" />
                </div>
                <h2 className="font-heading text-lg font-bold text-primary sm:text-xl group-hover:text-cta transition-colors">
                  {service.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-text-muted leading-relaxed">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cta">
                  Подробнее
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
