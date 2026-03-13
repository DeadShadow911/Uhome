"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ServicesIntroSection() {
  return (
    <section className="py-10 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
              Услуги ремонта квартир по доступной цене
            </h2>
            <p className="mt-4 text-text-muted leading-relaxed">
              Работа предполагает комплексный процесс: замеры, точные сметы и соблюдение технологий на всех этапах. Клиенту важно не просто сделать ремонт, а получить прогнозируемый результат без срывов сроков и увеличения стоимости в процессе работ.
            </p>
            <p className="mt-4 text-text-muted leading-relaxed">
              Мы берём на себя все этапы: замеры, черновой и чистовой ремонт, закупку качественных материалов и контроль выполнения работ. Ремонт под ключ позволяет заранее определить стоимость, зафиксировать цены в договоре и получить гарантию на выполненные работы.
            </p>
            <Button asChild variant="primary" size="lg" className="mt-6">
              <Link href="/uslugi">Все услуги</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-primary/5"
          >
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
              alt="Ремонт квартиры в Гродно"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
