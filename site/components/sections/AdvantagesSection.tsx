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
    <section className="py-10 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Наши преимущества
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-text-muted">
            Почему клиенты выбирают UHome для ремонта квартир и домов в Гродно
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: "0 12px 24px -10px rgba(10,10,10,0.15)" }}
                className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm transition-shadow"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
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
