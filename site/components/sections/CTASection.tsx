"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Phone, Send } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function CTASection() {
  const [submitted, setSubmitted] = useState(false);

  const formAction = siteConfig.formspree.cta
    ? `https://formspree.io/f/${siteConfig.formspree.cta}`
    : "#";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!siteConfig.formspree.cta) {
      setSubmitted(true);
      return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);
    const response = await fetch(formAction, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    if (response.ok) setSubmitted(true);
  };

  return (
    <section className="bg-primary py-10 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl rounded-2xl border border-white/20 bg-white/5 p-6 text-center backdrop-blur sm:p-8 md:p-12"
        >
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Готовы начать ремонт?
          </h2>
          <p className="mt-4 text-white/80">
            Оставьте заявку — перезвоним в течение 15 минут
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 rounded-lg border border-white/20 bg-white/10 p-6 text-white"
            >
              <p className="font-medium">Заявка отправлена!</p>
              <p className="mt-1 text-sm">Мы свяжемся с вами в ближайшее время.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input type="hidden" name="_subject" value="UHome: Заявка с главной страницы" />
              <input
                type="text"
                name="name"
                placeholder="Имя"
                required
                className="w-full min-h-[48px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                required
                className="w-full min-h-[48px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60"
              />
              <Button type="submit" variant="primary" size="lg" className="w-full gap-2">
                <Send className="size-4" />
                Заказать звонок
              </Button>
            </form>
          )}

          <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-white hover:underline"
            >
              <Phone className="size-4" />
              {siteConfig.phone}
            </a>
            <span className="hidden text-white/60 sm:inline">или</span>
            <a
              href={siteConfig.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              Написать в Telegram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
