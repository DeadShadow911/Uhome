"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { portfolioItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const types = ["Все", "Косметический ремонт", "Капитальный ремонт", "Дизайнерский ремонт", "Евроремонт", "Строительство под ключ"];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("Все");

  const filtered = filter === "Все"
    ? portfolioItems
    : portfolioItems.filter((p) => p.type === filter);

  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl lg:text-5xl">
          Портфолио
        </h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          Наши лучшие проекты по ремонту и строительству
        </p>

        <div className="mt-8 flex flex-wrap gap-2 sm:mt-12">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={cn(
                "min-h-[40px] rounded-lg px-3 py-2 text-xs font-medium transition sm:min-h-[44px] sm:px-4 sm:text-sm",
                filter === t
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-primary/5"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              className="group overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h2 className="font-heading text-lg font-semibold text-primary group-hover:text-accent">
                  {item.title}
                </h2>
                <p className="text-sm text-text-muted">{item.type} • {item.area}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
