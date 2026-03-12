"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    q: "Как рассчитывается стоимость ремонта?",
    a: "Стоимость рассчитывается на основе площади объекта, типа ремонта и выбранных материалов. Вы можете использовать наш калькулятор для ориентировочного расчёта или оставить заявку на бесплатный замер.",
  },
  {
    q: "Сколько времени занимает ремонт квартиры?",
    a: "Сроки зависят от объёма работ. Косметический ремонт — 2–4 недели, капитальный — 2–4 месяца. Точные сроки указываются в договоре после замера.",
  },
  {
    q: "Какая гарантия на работы?",
    a: "Мы предоставляем гарантию 5 лет на все виды ремонтных работ. Гарантийные обязательства фиксируются в договоре.",
  },
  {
    q: "Нужно ли покупать материалы самостоятельно?",
    a: "Вы можете закупать материалы сами или доверить это нам. Мы работаем с проверенными поставщиками и можем предложить выгодные цены.",
  },
  {
    q: "Как оформить заявку на ремонт?",
    a: "Оставьте заявку на сайте, позвоните нам или напишите в мессенджер. Мы перезвоним в течение 15 минут и договоримся о бесплатном замере.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl lg:text-5xl">
          Частые вопросы
        </h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          Ответы на популярные вопросы о ремонте и наших услугах
        </p>

        <Accordion type="single" collapsible className="mt-10 max-w-3xl sm:mt-16">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-text-muted">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
