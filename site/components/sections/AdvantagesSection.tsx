"use client";

import { motion } from "framer-motion";
import { Shield, FileText, Ruler, HardHat, CreditCard, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const advantages = [
  {
    icon: Shield,
    title: "Гарантия на работы",
    description: `${siteConfig.stats.warrantyLabel} на все виды ремонтных работ. Обязательства фиксируем в договоре.`,
  },
  {
    icon: FileText,
    title: "Фиксированная смета",
    description: "Цена фиксируется в договоре до начала работ. Никаких скрытых доплат и «сюрпризов» по ходу ремонта.",
  },
  {
    icon: Ruler,
    title: "Бесплатный замер и смета",
    description: "Выезд специалиста, обмеры и расчёт сметы — бесплатно. Точная стоимость за 2 рабочих дня.",
  },
  {
    icon: HardHat,
    title: "Прораб на объекте",
    description: "На каждом объекте закреплён прораб. Контроль качества, решение вопросов на месте, связь с вами.",
  },
  {
    icon: CreditCard,
    title: "Поэтапная оплата",
    description: "Оплата по факту выполненных работ. Аванс 10–20%, остальное — по завершении этапов.",
  },
  {
    icon: Clock,
    title: "Сроки в договоре",
    description: "Фиксируем сроки в договоре и соблюдаем график. Регулярные отчёты о ходе работ.",
  },
];

export function AdvantagesSection() {
  return (
    <section className="py-8 sm:py-10 md:py-14 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-center sm:mb-8"
        >
          <h2 className="font-heading text-xl font-bold text-primary sm:text-2xl md:text-3xl">
            Преимущества работы с нами
          </h2>
          <p className="mt-2 max-w-xl mx-auto text-sm text-text-muted">
            Получите максимально возможную выгоду во время ремонта
          </p>
        </motion.div>

        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -2, boxShadow: "0 8px 20px -8px rgba(10,10,10,0.12)" }}
                className="rounded-lg border border-primary/10 bg-white p-4 shadow-sm transition-shadow"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 sm:size-11">
                  <Icon className="size-5 text-primary sm:size-5" />
                </div>
                <h3 className="mt-3 font-heading text-base font-semibold text-primary sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-text-muted leading-snug sm:text-sm">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
