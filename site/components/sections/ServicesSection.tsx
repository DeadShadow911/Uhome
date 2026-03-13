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
    <section className="py-10 sm:py-16 md:py-24 bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-end"
        >
          <div className="text-center sm:text-left">
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Какие виды ремонта мы выполняем
            </h2>
            <p className="mt-4 max-w-2xl text-white/80">
              Выберите тип жилья и вид работ — увидите портфолио и подробнее об услуге
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Предыдущая услуга"
              className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-sm transition hover:border-white/50 hover:bg-white/20"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Следующая услуга"
              className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-sm transition hover:border-white/50 hover:bg-white/20"
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
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.4)" }}
                  className="group relative h-full rounded-xl border border-white/20 bg-white/5 p-4 transition-shadow sm:p-6"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-white/20 p-3 text-white">
                    <Icon className="size-8" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/80">{service.description}</p>
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white hover:underline"
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
          <Button asChild variant="secondary" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary">
            <Link href="/uslugi">Все услуги</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
