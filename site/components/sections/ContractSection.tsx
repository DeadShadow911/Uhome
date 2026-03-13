"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, FileText, Clock, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const items = [
  {
    icon: Banknote,
    title: "Оплата по факту сдачи работ",
    description: "За каждый этап — после подписания акта приёмки",
  },
  {
    icon: FileText,
    title: "Прозрачность ценообразования",
    description: "Сразу считаем цену и фиксируем в договоре",
  },
  {
    icon: Shield,
    title: "Гарантия на работы",
    description: `До ${siteConfig.stats.warrantyLabel} на выполненные работы`,
  },
  {
    icon: Clock,
    title: "Ремонт в срок",
    description: "Сроки каждого этапа прописаны в договоре",
  },
];

export function ContractSection() {
  return (
    <section className="py-10 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Договор без сюрпризов и скрытых рисков
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-text-muted">
            Ваша безопасность, закреплённая на бумаге
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <ul className="space-y-4 sm:space-y-6">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4 rounded-xl border border-primary/10 bg-white p-4 shadow-sm sm:p-6"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-primary">{item.title}</h3>
                    <p className="mt-1 text-sm text-text-muted">{item.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <Button asChild variant="outline" size="lg">
              <Link href="/kontakty">Заказать расчёт сметы</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
