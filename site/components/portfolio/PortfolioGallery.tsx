"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { ImageLightbox } from "./ImageLightbox";
import { Button } from "@/components/ui/button";
import { portfolioItems } from "@/lib/mock-data";

type PortfolioItem = (typeof portfolioItems)[number];

type Props = {
  item: PortfolioItem;
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

export function PortfolioGallery({ item }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = item.images ?? [item.image];
  const sections = item.sections ?? [];
  const params: Array<{ label: string; value: string }> =
    item.params && item.params.length > 0
      ? item.params
      : [
          ...(item.area ? [{ label: "Площадь", value: item.area }] : []),
          ...(item.rooms ? [{ label: "Комнат", value: item.rooms }] : []),
          ...(item.location ? [{ label: "Адрес", value: item.location }] : []),
          ...(item.style ? [{ label: "Стиль", value: item.style }] : []),
        ];

  const similarProjects = useMemo(() => {
    return portfolioItems
      .filter((p) => p.slug !== item.slug)
      .slice(0, 6);
  }, [item.slug]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="border-b border-primary/10 bg-primary/5">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 md:px-8">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-primary/80">
            <li>
              <Link href="/" className="hover:text-primary">
                Главная
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="size-4 shrink-0" />
              <Link href="/portfolio" className="hover:text-primary">
                Портфолио
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="size-4 shrink-0" />
              <span className="text-primary font-medium">{item.title}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"
            style={{ opacity: 0.75 }}
          />
        </div>
        <div className="relative flex min-h-[50vh] flex-col justify-end px-4 pb-12 pt-16 sm:px-6 sm:pb-16 md:px-8">
          <span className="text-sm font-medium uppercase tracking-widest text-white/90">
            {item.type}
          </span>
          <h1 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {item.title}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:px-8">
        {/* Параметры проекта (стиль sknebo.ru: Метраж, Срок, Тип) */}
        {params.length > 0 && (
          <motion.div
            {...fadeUp}
            className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {params.map((p) => (
              <div
                key={p.label}
                className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <span className="block text-xs font-medium uppercase tracking-wider text-primary/60">
                  {p.label}
                </span>
                <span className="mt-2 block text-lg font-semibold text-primary">
                  {p.value}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Вступление (стиль sknebo) */}
        {item.intro && (
          <motion.div {...fadeUp} className="mb-12">
            <p className="max-w-3xl text-base leading-relaxed text-primary/90 sm:text-lg">
              {item.intro}
            </p>
            <Button asChild className="mt-6">
              <Link href="/kontakty">Консультация</Link>
            </Button>
          </motion.div>
        )}

        {/* Секции с текстом + фото между ними */}
        {sections.length > 0 ? (
          <div className="space-y-16 sm:space-y-24">
            {sections.map((section, i) => (
              <div key={i}>
                <motion.section {...fadeUp}>
                  <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-primary/90 sm:text-lg">
                    {section.content.split("\n\n").map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </motion.section>

                {/* Фото после секции (если есть) */}
                {images[i] && (
                  <motion.div
                    {...fadeUp}
                    className="mt-10 group sm:mt-12"
                  >
                    <button
                      type="button"
                      onClick={() => openLightbox(i)}
                      className="relative block w-full overflow-hidden rounded-2xl bg-primary/5"
                    >
                      <div className="relative aspect-[16/10] w-full sm:aspect-video">
                        <Image
                          src={images[i]}
                          alt={`${item.title} — ${section.title}`}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 1024px) 100vw, 1024px"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                          <span className="rounded-full bg-white/90 px-6 py-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                            Открыть
                          </span>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </div>
            ))}

            {/* Оставшиеся фото (если секций меньше чем фото) */}
            {images.length > sections.length &&
              images.slice(sections.length).map((src, i) => (
                <motion.div key={i} {...fadeUp} className="group">
                  <button
                    type="button"
                    onClick={() => openLightbox(sections.length + i)}
                    className="relative block w-full overflow-hidden rounded-2xl bg-primary/5"
                  >
                    <div className="relative aspect-[16/10] w-full sm:aspect-video">
                      <Image
                        src={src}
                        alt={`${item.title} — фото ${sections.length + i + 1}`}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                        <span className="rounded-full bg-white/90 px-6 py-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          Открыть
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
          </div>
        ) : (
          /* Fallback: только галерея фото, если нет секций */
          <div className="space-y-16 sm:space-y-24">
            {item.description && (
              <motion.section
                {...fadeUp}
                className="rounded-2xl bg-primary px-8 py-12 text-white sm:px-12 sm:py-16"
              >
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                  О проекте
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">
                  {item.description}
                </p>
                {item.details && item.details.length > 0 && (
                  <ul className="mt-8 space-y-2 text-white/80">
                    {item.details.map((d, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span className="size-1.5 shrink-0 rounded-full bg-white" />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            )}

            {images.map((src, i) => (
              <motion.div key={i} {...fadeUp} className="group">
                <button
                  type="button"
                  onClick={() => openLightbox(i)}
                  className="relative block w-full overflow-hidden rounded-2xl bg-primary/5"
                >
                  <div className="relative aspect-[16/10] w-full sm:aspect-video">
                    <Image
                      src={src}
                      alt={`${item.title} — фото ${i + 1}`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                      <span className="rounded-full bg-white/90 px-6 py-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Открыть
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* До и после */}
        {item.beforeAfter && item.beforeImage && (
          <motion.section {...fadeUp} className="mt-16 sm:mt-24">
            <h2 className="mb-8 font-heading text-2xl font-bold text-primary sm:text-3xl">
              До и после
            </h2>
            <BeforeAfterSlider
              beforeImage={item.beforeImage}
              afterImage={item.image}
              alt={item.title}
            />
          </motion.section>
        )}

        {/* Похожие проекты (стиль sknebo.ru) */}
        {similarProjects.length > 0 && (
          <motion.section {...fadeUp} className="mt-20 sm:mt-24">
            <h2 className="mb-8 font-heading text-2xl font-bold text-primary sm:text-3xl">
              Похожие проекты
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/portfolio/${p.slug}`}
                  className="group overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition hover:shadow-lg hover:border-primary/20"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-heading text-base font-semibold text-primary group-hover:text-accent sm:text-lg">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">
                      {p.type} • {p.area}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="border-primary/30">
                <Link href="/portfolio">Все проекты</Link>
              </Button>
            </div>
          </motion.section>
        )}
      </div>

      {/* CTA как у sknebo.ru */}
      <section className="bg-primary py-16 text-center text-white sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl md:text-4xl">
            Проконсультируйтесь <em className="font-normal">бесплатно</em> с нашим
            специалистом
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Ответит на любой вопрос и поможет рассчитать стоимость ремонта
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
        alt={item.title}
      />
    </>
  );
}
