"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Wrench, Users, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const points = [
  {
    icon: Wrench,
    title: "Профессиональный инструмент",
    description: "Современное оборудование для качественной и быстрой отделки",
  },
  {
    icon: Users,
    title: "Опытные мастера",
    description: "Узкоспециализированные бригады с опытом работы в Гродно и области",
  },
  {
    icon: ClipboardCheck,
    title: "Контроль на каждом этапе",
    description: "Прораб следит за качеством работ и соблюдением сроков",
  },
];

export function QualityBlock() {
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
            Качественный ремонт квартир под ключ
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-text-muted">
            Предлагаем комфортные условия для сотрудничества
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {points.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 rounded-xl border border-primary/10 bg-white p-6 shadow-sm"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Button asChild variant="primary">
            <Link href="/kalkulyator">Рассчитать стоимость</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
