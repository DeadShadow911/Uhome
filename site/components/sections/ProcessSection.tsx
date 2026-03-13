"use client";

import { motion } from "framer-motion";
import { ClipboardList, MapPin, FileText, FileCheck, Truck, HardHat, Sparkles, Banknote } from "lucide-react";
import { processSteps } from "@/lib/mock-data";

const icons = [ClipboardList, MapPin, FileText, FileCheck, Truck, HardHat, Sparkles, Banknote];

export function ProcessSection() {
  return (
    <section className="bg-primary py-8 text-white sm:py-10 md:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-center sm:mb-8"
        >
          <h2 className="font-heading text-xl font-bold sm:text-2xl md:text-3xl">
            Как мы работаем
          </h2>
          <p className="mt-2 max-w-xl mx-auto text-sm sm:text-base text-white/80">
            Прозрачный процесс от заявки до сдачи объекта
          </p>
        </motion.div>

        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item, i) => {
            const Icon = icons[i] || ClipboardList;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-lg border border-white/20 bg-white/5 p-4 text-center"
              >
                <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-white/20 sm:size-12">
                  <Icon className="size-5 text-white sm:size-6" />
                </div>
                <span className="text-xs font-semibold text-white/70">Шаг {item.step}</span>
                <h4 className="mt-1 font-heading text-base font-semibold sm:text-lg">{item.title}</h4>
                <p className="mt-0.5 text-xs text-white/80 sm:text-sm leading-snug">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
