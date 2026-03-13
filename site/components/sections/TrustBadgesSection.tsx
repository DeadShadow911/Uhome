"use client";

import { motion } from "framer-motion";
import { CreditCard, Truck, FileText, Clock } from "lucide-react";

const badges = [
  {
    icon: CreditCard,
    title: "Поэтапная оплата",
    description: "Платите за каждый этап после подписания акта приёмки",
  },
  {
    icon: Truck,
    title: "Выезд в день обращения",
    description: "Бесплатный выезд замерщика в Гродно уже в день обращения",
  },
  {
    icon: FileText,
    title: "Фиксированная цена",
    description: "Гарантирована по договору, без изменений в процессе работ",
  },
  {
    icon: Clock,
    title: "Ремонт в срок",
    description: "Сроки каждого этапа прописаны в договоре",
  },
];

export function TrustBadgesSection() {
  return (
    <section className="bg-background py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="mt-3 font-heading text-base font-semibold text-primary sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
