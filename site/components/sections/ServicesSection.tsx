"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, Building, Palette, Hammer, PaintBucket, Wrench, ChevronRight, ChevronLeft } from "lucide-react";
import { services } from "@/lib/mock-data";
import "swiper/css";

const iconMap = {
  Home,
  Building,
  Palette,
  Hammer,
  PaintBucket,
  Wrench,
};

export function ServicesSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="py-10 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-end"
        >
          <div className="text-center sm:text-left">
            <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
              Услуги
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">
              Полный спектр работ по ремонту и отделке квартир и частных домов
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Предыдущая услуга"
              className="flex size-11 items-center justify-center rounded-full border border-primary/20 bg-white text-primary shadow-sm transition hover:border-primary/40 hover:bg-primary/5"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Следующая услуга"
              className="flex size-11 items-center justify-center rounded-full border border-primary/20 bg-white text-primary shadow-sm transition hover:border-primary/40 hover:bg-primary/5"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        </motion.div>

        <Swiper
          spaceBetween={16}
          slidesPerView={1.05}
          breakpoints={{
            640: { spaceBetween: 24, slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          className="services-swiper -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Home;
            return (
              <SwiperSlide key={service.slug}>
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(26,26,46,0.2)" }}
                  className="group relative h-full rounded-xl border border-primary/10 bg-white p-4 transition-shadow sm:p-6"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                    <Icon className="size-8" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">{service.description}</p>
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Подробнее
                    <ChevronRight className="size-4" />
                  </Link>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Button asChild variant="secondary">
            <Link href="/uslugi">Все услуги</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
