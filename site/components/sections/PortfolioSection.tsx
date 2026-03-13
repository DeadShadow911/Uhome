"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { portfolioItems } from "@/lib/mock-data";
import "swiper/css";

const displayedItems = portfolioItems.slice(0, 6);

export function PortfolioSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-background py-10 sm:py-16 md:py-20 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-end"
        >
          <div className="text-center sm:text-left">
            <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
              Наше портфолио
            </h2>
            <p className="mt-2 text-text-muted text-sm sm:text-base">
              Готовые ремонты в Гродно — качество, которое видно
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Предыдущий проект"
              className="flex size-10 sm:size-11 items-center justify-center rounded-full border border-primary/20 bg-background text-primary shadow-sm transition hover:border-primary/40 hover:bg-primary/5"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="size-5 sm:size-6" />
            </button>
            <button
              type="button"
              aria-label="Следующий проект"
              className="flex size-10 sm:size-11 items-center justify-center rounded-full border border-primary/20 bg-background text-primary shadow-sm transition hover:border-primary/40 hover:bg-primary/5"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="size-5 sm:size-6" />
            </button>
          </div>
        </motion.div>

        <Swiper
          spaceBetween={12}
          slidesPerView={1}
          grabCursor
          breakpoints={{
            480: { spaceBetween: 16, slidesPerView: 1.2 },
            640: { spaceBetween: 20, slidesPerView: 2 },
            1024: { spaceBetween: 24, slidesPerView: 3 },
          }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          className="portfolio-swiper -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {displayedItems.map((item) => (
            <SwiperSlide key={item.slug}>
              <article className="group relative h-full overflow-hidden rounded-xl bg-surface shadow-sm ring-1 ring-primary/5 transition-shadow hover:shadow-lg hover:ring-primary/10">
                <Link href={`/portfolio/${item.slug}`} className="block h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-primary">{item.title}</h3>
                    <p className="mt-1 text-sm text-text-muted">{item.type} · {item.area}</p>
                  </div>
                </Link>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <Button asChild variant="primary">
            <Link href="/portfolio">Все проекты</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
