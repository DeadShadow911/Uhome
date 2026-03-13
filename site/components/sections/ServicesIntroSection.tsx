"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ServicesIntroSection() {
  return (
    <section className="bg-background py-10 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
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
      </div>
    </section>
  );
}
