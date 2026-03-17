"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, Building, Building2, Hammer, PaintBucket, Wrench, Flame, Car, Tent, TreePine, ChevronRight, ChevronLeft } from "lucide-react";
import { services } from "@/lib/mock-data";
import type { ServiceCategory } from "@/lib/mock-data";
import "swiper/css";

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

function ServiceCard({
  service,
  Icon,
}: {
  service: (typeof services)[0];
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.4)" }}
      className="group relative flex h-full flex-col rounded-xl border border-white/20 bg-white/5 p-4 transition-shadow sm:p-6"
    >
      <div className="mb-4 inline-flex rounded-lg bg-white/20 p-3 text-white">
        <Icon className="size-8" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-white">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-white/80">{service.description}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white group-hover:underline">
        Подробнее
        <ChevronRight className="size-4" />
      </span>
    </motion.div>
  );
}

export function ServicesSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("remont");
  const filteredServices = services.filter((s) => (s.category ?? "remont") === activeCategory);

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center gap-4"
        >
          <div className="text-center w-full max-w-2xl">
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Наши услуги
            </h2>
            <p className="mt-4 text-white/80">
              Ремонт, отделка и строительство домов, бань, придомовых построек
            </p>
          </div>
          <div className="flex shrink-0 gap-1 rounded-lg border border-white/20 bg-white/5 p-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${activeCategory === cat.id ? "bg-white text-primary" : "text-white/80 hover:text-white"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 gap-2 lg:hidden">
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

        <div className="lg:hidden">
          <Swiper
            key={activeCategory}
            spaceBetween={16}
            slidesPerView={1.05}
            breakpoints={{
              640: { spaceBetween: 24, slidesPerView: 2 },
            }}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            className="services-swiper -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {filteredServices.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Home;
              return (
                <SwiperSlide key={service.slug}>
                  <ServiceCard service={service} Icon={Icon} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {filteredServices.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Home;
            return (
              <Link key={service.slug} href={`/uslugi/${service.slug}`}>
                <ServiceCard service={service} Icon={Icon} />
              </Link>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Button asChild variant="primary">
            <Link href="/uslugi">Все услуги</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
