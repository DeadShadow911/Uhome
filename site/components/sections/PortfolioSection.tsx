"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { portfolioItems } from "@/lib/mock-data";

export function PortfolioSection() {
  return (
    <section className="bg-background py-10 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Портфолио
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-text-muted">
            Лучшие проекты наших мастеров
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.slice(0, 6).map((item, i) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-xl bg-surface shadow-md"
            >
              <Link href={`/portfolio/${item.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-primary/50 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-full bg-primary px-6 py-2 font-medium text-white">
                      Смотреть кейс
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-4">
                  <h3 className="font-heading font-semibold text-primary">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.type} • {item.area}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Button asChild variant="primary">
            <Link href="/portfolio">Все портфолио</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
