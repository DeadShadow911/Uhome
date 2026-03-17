"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Эконом",
    price: "от 50",
    unit: "руб/м²",
    description: "Косметический ремонт: покраска, обои, замена плинтусов",
    popular: false,
  },
  {
    name: "Базовый",
    price: "от 100",
    unit: "руб/м²",
    description: "Евроремонт: черновая подготовка, качественная чистовая отделка",
    popular: true,
  },
  {
    name: "Премиум",
    price: "от 150",
    unit: "руб/м²",
    description: "Капремонт под ключ: материалы премиум, дизайн-проект",
    popular: false,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-30px" },
  transition: { duration: 0.4, ease: "easeOut" },
};

export function PricingTiersSection() {
  return (
    <section className="bg-white py-10 sm:py-14 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          {...fadeUp}
          className="mb-8 text-center sm:mb-10 md:mb-12"
        >
          <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Цены на ремонт квартир
          </h2>
          <p className="mt-2 text-text-muted sm:text-lg">
            Стоимость за м² — ориентировочные цены в Гродно 2025
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              className={`relative flex flex-col rounded-2xl border-2 p-6 sm:p-8 ${
                tier.popular
                  ? "border-cta bg-cta/5 shadow-lg shadow-cta/10 md:-mt-2 md:mb-2"
                  : "border-primary/10 bg-white"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cta px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  Популярный
                </span>
              )}
              <h3 className="font-heading text-xl font-bold text-primary sm:text-2xl">
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                  {tier.price}
                </span>
                <span className="text-text-muted">{tier.unit}</span>
              </div>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                {tier.description}
              </p>
              <div className="mt-6 flex flex-1 flex-col justify-end">
                <Button
                  asChild
                  variant={tier.popular ? "primary" : "secondary"}
                  size="sm"
                  className="w-full"
                >
                  <Link href="/kalkulyator">Рассчитать</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp}
          className="mt-6 text-center text-sm text-text-muted"
        >
          Точная стоимость после бесплатного замера объекта
        </motion.p>
      </div>
    </section>
  );
}
