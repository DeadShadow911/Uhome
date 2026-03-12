"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { QuizDialog } from "@/components/quiz/QuizDialog";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop",
    title: "Ремонт квартир под ключ",
    description:
      "Полный цикл работ: от черновой отделки до финишных материалов. Соблюдаем сроки, работаем по договору с фиксированной сметой.",
    ctaText: "Рассчитать стоимость",
    ctaHref: "/kalkulyator",
    secondaryCtaText: "Наши проекты",
    secondaryCtaHref: "/portfolio",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop",
    title: "Строительство домов",
    description:
      "Каркасные дома и коттеджи из блоков под ключ. Собственная бригада, контроль качества на каждом этапе, гарантия 2 года.",
    ctaText: "Посмотреть пакеты",
    ctaHref: "/kalkulyator?type=house",
    secondaryCtaText: "О компании",
    secondaryCtaHref: "/o-kompanii",
  },
  {
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop",
    title: "Качественная отделка",
    description:
      "Премиальные материалы и аккуратная работа. 12 лет на рынке, 70+ реализованных объектов в Гродно и области.",
    ctaText: "Заказать звонок",
    ctaHref: "/kontakty",
    secondaryCtaText: "Услуги",
    secondaryCtaHref: "/uslugi",
  },
];

const stats = [
  { value: `${siteConfig.stats.projectsCount}+`, label: "объектов" },
  { value: `${siteConfig.stats.yearsExperience} лет`, label: "опыта" },
  { value: siteConfig.stats.warrantyLabel, label: "гарантия" },
];

export function Hero() {
  return (
    <section className="hero-section relative h-[calc(100svh-56px)] min-h-[400px] overflow-hidden md:h-[90vh] md:min-h-[500px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        touchEventsTarget="container"
        resistanceRatio={0}
        loop
        className="!h-full w-full"
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={i} className="!h-full">
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-8 md:justify-center">
                <div className="w-full max-w-2xl md:text-center">
                  <h1 className="font-heading text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-3 text-base leading-relaxed text-white/90 sm:mt-4 sm:text-lg md:text-xl">
                    {slide.description}
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4 md:justify-center">
                      <QuizDialog>
                        <Button size="lg" variant="primary" className="w-full sm:w-auto">
                          Подобрать решение
                        </Button>
                      </QuizDialog>
                      <Button asChild size="lg" variant="secondary" className="w-full border-white text-white hover:bg-white hover:text-cta sm:w-auto">
                        <Link href={slide.ctaHref}>{slide.ctaText}</Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="secondary"
                        className="w-full border-white text-white hover:bg-white hover:text-cta sm:w-auto"
                      >
                        <Link href={slide.secondaryCtaHref}>{slide.secondaryCtaText}</Link>
                      </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Предыдущий слайд"
        className="hero-prev absolute left-2 top-1/2 z-10 hidden min-h-[44px] min-w-[44px] -translate-y-1/2 rounded-full border border-white/30 bg-black/30 p-3 text-white backdrop-blur-sm transition hover:bg-black/50 sm:left-4 sm:flex sm:items-center sm:justify-center md:left-8"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        aria-label="Следующий слайд"
        className="hero-next absolute right-2 top-1/2 z-10 hidden min-h-[44px] min-w-[44px] -translate-y-1/2 rounded-full border border-white/30 bg-black/30 p-3 text-white backdrop-blur-sm transition hover:bg-black/50 sm:right-4 sm:flex sm:items-center sm:justify-center md:right-8"
      >
        <ChevronRight className="size-6" />
      </button>

      <div
        className="absolute bottom-4 left-0 right-0 z-10 flex justify-center sm:bottom-6 md:bottom-8"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="flex gap-6 sm:gap-12 md:gap-16">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-heading text-lg font-bold text-white sm:text-2xl md:text-3xl">
                {value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/70">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
