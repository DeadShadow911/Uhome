"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { calculateCost, type CalculatorParams, type CalculatorResult } from "@/lib/calculator";
import { siteConfig } from "@/lib/site-config";

const initialParams: CalculatorParams = {
  objectType: "apartment",
  area: 45,
  ceilingHeight: 2.7,
  rooms: 2,
  bathrooms: 1,
  repairType: "euro",
  apartmentState: "new",
  floorMaterial: "laminate",
  ceilingType: "paint",
};

function formatEstimateSummary(params: CalculatorParams, result: CalculatorResult): string {
  const lines: string[] = [];
  lines.push(`Тип объекта: ${params.objectType === "apartment" ? "Квартира" : "Дом"}`);
  lines.push(`Площадь: ${params.area} м²`);
  if (params.objectType === "apartment") {
    lines.push(`Тип ремонта: ${params.repairType === "cosmetic" ? "Косметический" : params.repairType === "euro" ? "Евроремонт" : "Капитальный"}`);
    lines.push(`Состояние: ${params.apartmentState === "new" ? "Новостройка" : "Вторичка"}`);
    lines.push(`Комнат: ${params.rooms}, Санузлов: ${params.bathrooms}`);
  } else {
    lines.push(`Пакет: ${params.housePackage || "blocks_full"}`);
  }
  lines.push("");
  lines.push(`Ориентировочная стоимость: ${result.totalByn.toLocaleString("ru")} BYN (≈ $${result.totalUsd.toLocaleString("ru")})`);
  lines.push("");
  lines.push("Позиции сметы:");
  result.items.forEach((i) => {
    lines.push(`  • ${i.name}: ${i.quantity} ${i.unit} × ${i.priceByn} BYN = ${i.sumByn.toLocaleString("ru")} BYN`);
  });
  return lines.join("\n");
}

export function CalculatorSection() {
  const [params, setParams] = useState<CalculatorParams>(initialParams);
  const [result, setResult] = useState<ReturnType<typeof calculateCost>>(() =>
    calculateCost(initialParams)
  );
  const [showForm, setShowForm] = useState(false);
  const [estimateSubmitted, setEstimateSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setResult(calculateCost(params));
  }, [params]);

  const formId = siteConfig.formspree.calculator;
  const formAction = formId ? `https://formspree.io/f/${formId}` : "#";

  const handleEstimateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formId) {
      setEstimateSubmitted(true);
      return;
    }
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("_subject", "UHome: Запрос точной сметы из калькулятора");
    formData.set("estimate_summary", formatEstimateSummary(params, result));
    const response = await fetch(formAction, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    setIsSubmitting(false);
    if (response.ok) setEstimateSubmitted(true);
  };

  return (
    <section className="py-10 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Калькулятор стоимости
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-text-muted">
            Укажите параметры — рассчитаем стоимость и отправим смету на почту в течение 5 минут
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-4xl rounded-xl border border-primary/10 bg-white p-4 shadow-lg sm:rounded-2xl sm:p-6 md:p-8 lg:max-w-5xl"
        >
          {showForm ? (
            estimateSubmitted ? (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-8 sm:p-12 text-center">
                <p className="font-heading text-xl font-semibold text-primary">Заявка отправлена!</p>
                <p className="mt-2 text-text-muted">Мы отправим смету на указанный email и перезвоним.</p>
              </div>
            ) : (
              <form onSubmit={handleEstimateSubmit} className="mx-auto max-w-md space-y-6">
                <h3 className="font-heading text-xl font-semibold text-primary">Оставьте контакты</h3>
                <p className="text-sm text-text-muted">Рассчитаем стоимость и отправим смету в течение 5 минут</p>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  required
                  className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Имя"
                  required
                  className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                />
                <Button type="submit" disabled={isSubmitting} variant="primary" size="lg" className="w-full min-h-[48px]">
                  {isSubmitting ? "Отправка…" : "Отправить заявку"}
                </Button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="block w-full text-sm text-text-muted hover:text-primary"
                >
                  ← Назад к параметрам
                </button>
              </form>
            )
          ) : (
            <div className="grid min-w-0 gap-6 sm:gap-8 md:grid-cols-2 md:gap-8">
            <div className="min-w-0 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  Тип объекта
                </label>
                <select
                  value={params.objectType}
                  onChange={(e) =>
                    setParams((p) => ({
                      ...p,
                      objectType: e.target.value as "apartment" | "house",
                    }))
                  }
                  className="w-full min-w-0 min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                >
                  <option value="apartment">Квартира</option>
                  <option value="house">Дом</option>
                </select>
              </div>

              {params.objectType === "apartment" ? (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-primary">Тип ремонта</label>
                    <select
                      value={params.repairType ?? "euro"}
                      onChange={(e) =>
                        setParams((p) => ({ ...p, repairType: e.target.value as "cosmetic" | "euro" | "capital" }))
                      }
                      className="w-full min-w-0 min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                    >
                      <option value="cosmetic">Косметический</option>
                      <option value="euro">Евроремонт</option>
                      <option value="capital">Капитальный</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-primary">Состояние помещения</label>
                    <select
                      value={params.apartmentState ?? "new"}
                      onChange={(e) =>
                        setParams((p) => ({ ...p, apartmentState: e.target.value as "new" | "secondary" }))
                      }
                      className="w-full min-w-0 min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                    >
                      <option value="new">Новостройка</option>
                      <option value="secondary">Вторичка</option>
                    </select>
                  </div>
                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-medium text-primary">
                      Площадь, <span className="whitespace-nowrap">м² — {params.area}</span>
                    </label>
                    <input
                      type="range"
                      min={20}
                      max={300}
                      value={params.area}
                      onChange={(e) =>
                        setParams((p) => ({ ...p, area: Number(e.target.value) }))
                      }
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-primary">
                      Высота потолков, м
                    </label>
                    <input
                      type="number"
                      min={2.5}
                      max={4}
                      step={0.1}
                      value={params.ceilingHeight ?? 2.7}
                      onChange={(e) =>
                        setParams((p) => ({
                          ...p,
                          ceilingHeight: Number(e.target.value),
                        }))
                      }
                      className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                    />
                  </div>
                  <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <label className="mb-2 block text-sm font-medium text-primary">
                        Комнат
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={params.rooms ?? 2}
                        onChange={(e) =>
                          setParams((p) => ({ ...p, rooms: Number(e.target.value) }))
                        }
                        className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                      />
                    </div>
                    <div className="min-w-0">
                      <label className="mb-2 block text-sm font-medium text-primary">
                        Санузлов
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={4}
                        value={params.bathrooms ?? 1}
                        onChange={(e) =>
                          setParams((p) => ({ ...p, bathrooms: Number(e.target.value) }))
                        }
                        className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                      />
                    </div>
                  </div>
                  {params.repairType !== "cosmetic" && (
                    <>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-primary">Материал пола</label>
                        <select
                          value={params.floorMaterial ?? "laminate"}
                          onChange={(e) =>
                            setParams((p) => ({ ...p, floorMaterial: e.target.value as "laminate" | "tile" | "parquet" }))
                          }
                          className="w-full min-w-0 min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                        >
                          <option value="laminate">Ламинат</option>
                          <option value="tile">Плитка</option>
                          <option value="parquet">Паркетная доска</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-primary">Потолок</label>
                        <select
                          value={params.ceilingType ?? "paint"}
                          onChange={(e) =>
                            setParams((p) => ({ ...p, ceilingType: e.target.value as "paint" | "stretch" }))
                          }
                          className="w-full min-w-0 min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                        >
                          <option value="paint">Шпаклёвка + покраска</option>
                          <option value="stretch">Натяжной</option>
                        </select>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-medium text-primary">
                      Площадь дома, <span className="whitespace-nowrap">м² — {params.area}</span>
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={500}
                      value={params.area}
                      onChange={(e) =>
                        setParams((p) => ({ ...p, area: Number(e.target.value) }))
                      }
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-primary">
                      Пакет
                    </label>
                    <select
                      value={params.housePackage ?? "blocks_full"}
                      onChange={(e) =>
                        setParams((p) => ({ ...p, housePackage: e.target.value }))
                      }
                      className="w-full min-w-0 min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3 text-primary"
                    >
                      <option value="frame">Каркасный дом — коробка</option>
                      <option value="blocks_box">Дом из блоков — коробка</option>
                      <option value="blocks_full">Дом из блоков — под ключ</option>
                      <option value="brick_box">Кирпичный дом — коробка</option>
                      <option value="brick_full">Кирпичный дом — под ключ</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="flex min-w-0 min-h-[200px] flex-col justify-center rounded-xl bg-primary/5 p-5 sm:p-6 md:min-h-0">
              <div className="text-center">
                <p className="font-heading text-lg font-semibold text-primary sm:text-xl">
                  Узнайте стоимость ремонта
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  Нажмите кнопку — оставьте контакты и получите расчёт
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  type="button"
                  className="mt-5 w-full min-h-[48px] whitespace-normal text-center py-3 text-sm tracking-normal sm:mt-6 sm:text-base sm:tracking-[0.2em]"
                  onClick={() => setShowForm(true)}
                >
                  Узнать стоимость
                </Button>
              </div>
            </div>
          </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
