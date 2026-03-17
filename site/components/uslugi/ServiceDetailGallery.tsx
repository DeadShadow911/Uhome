"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/portfolio/ImageLightbox";
import type { ServiceItem } from "@/lib/mock-data";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4, ease: "easeOut" },
};

type Props = { service: ServiceItem };

export function ServiceDetailGallery({ service }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const images = service.images ?? [];
  const fullDescription = service.fullDescription ?? null;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="border-b border-primary/10 bg-white">
        <div className="container mx-auto px-4 py-3 sm:px-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-text-muted">
            <li><Link href="/" className="hover:text-primary">Главная</Link></li>
            <li className="flex items-center gap-1">
              <ChevronRight className="size-4 shrink-0" />
              <Link href="/uslugi" className="hover:text-primary">Услуги</Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="size-4 shrink-0" />
              <span className="text-primary font-medium">{service.title}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[55vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images[0] ?? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"}
            alt={service.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"
            style={{ opacity: 0.8 }}
          />
        </div>
        <div className="relative flex min-h-[55vh] flex-col justify-end container mx-auto px-4 pb-12 pt-16 sm:px-6 sm:pb-16 md:px-8">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl">
            {service.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/90 sm:text-lg">
            {service.description}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:px-8">
        {/* Описание в карточке */}
        {fullDescription && (
          <motion.section
            {...fadeUp}
            className="mb-16 rounded-2xl bg-primary px-6 py-10 text-white sm:px-10 sm:py-14 md:px-14"
          >
            <h2 className="font-heading text-xl font-bold sm:text-2xl">
              О услуге
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/90 sm:text-lg">
              {fullDescription.split("\n\n").map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          </motion.section>
        )}

        {/* Галерея — только если больше одного фото */}
        {images.length > 1 && (
          <motion.section {...fadeUp} className="mb-16">
            <h2 className="mb-8 font-heading text-2xl font-bold text-primary sm:text-3xl">
              Фото работ
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {images.slice(0, 6).map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => openLightbox(i)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-primary/5"
                >
                  <Image
                    src={src}
                    alt={`${service.title} — фото ${i + 1}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                    <span className="rounded-full bg-white/90 px-5 py-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Увеличить
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA блок */}
        <motion.section {...fadeUp}>
          <div className="rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10 px-6 py-10 sm:px-10 sm:py-14">
            <h2 className="font-heading text-xl font-bold text-primary sm:text-2xl">
              Узнать стоимость
            </h2>
            <p className="mt-3 max-w-xl text-text-muted">
              Рассчитайте примерную стоимость работ в калькуляторе или закажите бесплатный выезд специалиста на замер
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" variant="primary">
                <Link href="/kalkulyator">Быстрый расчёт</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/kontakty">Заказать звонок</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Нижний CTA */}
      <section className="bg-primary py-16 text-center text-white sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl md:text-4xl">
            Проконсультируйтесь <em className="font-normal">бесплатно</em> с нашим специалистом
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Ответит на любой вопрос по {service.title.toLowerCase()} и поможет рассчитать стоимость
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              variant="secondary"
              className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-cta"
            >
              <Link href="/kalkulyator">Быстрый расчёт</Link>
            </Button>
            <Button asChild variant="primary">
              <Link href="/kontakty">Заказать звонок</Link>
            </Button>
          </div>
        </div>
      </section>

      <ImageLightbox
        images={images}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        alt={service.title}
      />
    </>
  );
}
