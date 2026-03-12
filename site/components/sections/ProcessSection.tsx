"use client";

import { motion } from "framer-motion";
import { ClipboardList, FileCheck, Calculator, Truck, HardHat, CheckCircle } from "lucide-react";
import { processSteps } from "@/lib/mock-data";

const icons = [ClipboardList, FileCheck, Calculator, Truck, HardHat, CheckCircle];

export function ProcessSection() {
  return (
    <section className="bg-primary py-10 text-white sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center sm:mb-16"
        >
          <h2 className="font-heading text-2xl font-bold sm:text-3xl md:text-4xl">
            Процесс работы
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/80">
            От замеров до сдачи объекта — прозрачно и поэтапно
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {processSteps.map((item, i) => {
            const Icon = icons[i] || ClipboardList;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-white/20 bg-white/5 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-white/20">
                  <Icon className="size-7 text-white" />
                </div>
                <span className="font-heading text-sm font-semibold text-white/80">
                  Шаг {item.step}
                </span>
                <h4 className="mt-2 font-heading text-lg font-semibold">{item.title}</h4>
                <p className="mt-1 text-sm text-white/80">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
