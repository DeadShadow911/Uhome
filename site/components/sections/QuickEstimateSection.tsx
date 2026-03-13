"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { usePhoneValidation } from "@/components/forms/PhoneInput";

type QuickEstimateParams = {
  objectType: "apartment" | "house" | "room";
  repairType: "cosmetic" | "euro" | "capital";
  premisesType: "new" | "secondary";
  area: number;
};

const initialParams: QuickEstimateParams = {
  objectType: "apartment",
  repairType: "euro",
  premisesType: "new",
  area: 50,
};

function formatSummary(params: QuickEstimateParams): string {
  const obj =
    params.objectType === "apartment"
      ? "Квартира"
      : params.objectType === "house"
        ? "Дом"
        : "Комната";
  const repair =
    params.repairType === "cosmetic"
      ? "Косметический"
      : params.repairType === "euro"
        ? "Евроремонт"
        : "Капитальный";
  const premises = params.premisesType === "new" ? "Новостройка" : "Вторичка";
  return [
    `Объект: ${obj}`,
    `Вид ремонта: ${repair}`,
    `Тип помещения: ${premises}`,
    `Площадь: ${params.area} м²`,
  ].join("\n");
}

export function QuickEstimateSection() {
  const [step, setStep] = useState(1);
  const [params, setParams] = useState<QuickEstimateParams>(initialParams);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agree, setAgree] = useState(false);
  const { phoneError, setPhoneError, validatePhone } = usePhoneValidation();

  const formId = siteConfig.formspree.calculator;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agree) return;
    const form = e.currentTarget;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value ?? "";
    if (!validatePhone(phone)) return;
    setIsSubmitting(true);
    if (!formId) {
      setIsSubmitting(false);
      setSubmitted(true);
      return;
    }
    const formData = new FormData(form);
    formData.set("_subject", "UHome: Быстрый расчёт стоимости");
    formData.set("params_summary", formatSummary(params));
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    setIsSubmitting(false);
    if (res.ok) setSubmitted(true);
  };

  const canNext = params.area >= 10;

  if (submitted) {
    return (
      <section className="py-10 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-lg rounded-2xl border border-primary/10 bg-white p-8 shadow-lg text-center"
          >
            <p className="font-heading text-xl font-semibold text-primary">
              Заявка отправлена!
            </p>
            <p className="mt-2 text-text-muted">
              Рассчитаем стоимость и перезвоним в течение 5 минут
            </p>
            <Button asChild variant="primary" size="lg" className="mt-6">
              <Link href="/">На главную</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Калькулятор расчёта стоимости ремонта
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-text-muted text-sm sm:text-base">
            Узнайте примерную стоимость ремонта вашей квартиры
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-xl rounded-2xl border border-primary/10 bg-white p-6 shadow-lg sm:p-8"
        >
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-primary/70">
            <span>Шаг</span>
            <span className="text-cta">№{step}</span>
            <span>из 2</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">
                    Что нужно отремонтировать?
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
                    {[
                      { value: "apartment" as const, label: "Квартира" },
                      { value: "house" as const, label: "Дом" },
                      { value: "room" as const, label: "Комната" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setParams((p) => ({ ...p, objectType: opt.value }))
                        }
                        className={`min-h-[44px] rounded-lg px-4 font-medium transition ${
                          params.objectType === opt.value
                            ? "bg-cta text-white"
                            : "border border-primary/20 bg-background text-primary hover:border-cta/50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">
                    Вид ремонта
                  </label>
                  <select
                    value={params.repairType}
                    onChange={(e) =>
                      setParams((p) => ({
                        ...p,
                        repairType: e.target.value as QuickEstimateParams["repairType"],
                      }))
                    }
                    className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                  >
                    <option value="cosmetic">Косметический</option>
                    <option value="euro">Евроремонт</option>
                    <option value="capital">Капитальный</option>
                  </select>
                </div>

                {params.objectType === "apartment" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-primary">
                      Тип помещения
                    </label>
                    <select
                      value={params.premisesType}
                      onChange={(e) =>
                        setParams((p) => ({
                          ...p,
                          premisesType: e.target.value as QuickEstimateParams["premisesType"],
                        }))
                      }
                      className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                    >
                      <option value="new">Новостройка</option>
                      <option value="secondary">Вторичка</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">
                    Площадь помещения, м²
                  </label>
                  <input
                    type="number"
                    min={params.objectType === "room" ? 10 : 20}
                    max={params.objectType === "house" ? 500 : 300}
                    value={params.area}
                    onChange={(e) =>
                      setParams((p) => ({
                        ...p,
                        area: Number(e.target.value) || 20,
                      }))
                    }
                    className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                  />
                </div>

                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  className="w-full gap-2"
                  disabled={!canNext}
                  onClick={() => setStep(2)}
                >
                  Далее
                  <ChevronRight className="size-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <p className="text-sm text-text-muted">
                  Введите контактный номер — рассчитаем и отправим стоимость в
                  течение 5 минут
                </p>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+375 (33) 123 45 67"
                    required
                    className={`w-full min-h-[48px] rounded-lg border px-4 py-3 text-primary ${
                      phoneError ? "border-red-500 bg-red-50" : "border-primary/20 bg-background"
                    }`}
                    onFocus={() => setPhoneError(null)}
                  />
                  {phoneError && (
                    <p className="mt-1.5 text-sm text-red-600">{phoneError}</p>
                  )}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 size-4 rounded border-primary/30 accent-cta"
                  />
                  <span className="text-sm text-primary/80">
                    Я согласен с{" "}
                    <Link
                      href="/politika-konfidencialnosti"
                      className="text-cta hover:underline"
                    >
                      политикой обработки персональных данных
                    </Link>
                  </span>
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    className="gap-2 w-full sm:flex-1 order-2 sm:order-1"
                    onClick={() => setStep(1)}
                  >
                    <ChevronLeft className="size-4" />
                    Назад
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:flex-1 order-1 sm:order-2"
                    disabled={!agree || isSubmitting}
                  >
                    {isSubmitting ? "Отправка…" : "Узнать стоимость"}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
