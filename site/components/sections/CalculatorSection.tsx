"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { calculateCost, type CalculatorParams } from "@/lib/calculator";

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

export function CalculatorSection() {
  const [params, setParams] = useState<CalculatorParams>(initialParams);
  const [result, setResult] = useState<ReturnType<typeof calculateCost>>(() =>
    calculateCost(initialParams)
  );

  useEffect(() => {
    setResult(calculateCost(params));
  }, [params]);

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
            Ориентировочный расчёт стоимости ремонта. Точная смета — после замера.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-4xl rounded-xl border border-primary/10 bg-white p-4 shadow-lg sm:rounded-2xl sm:p-6 md:p-8 lg:max-w-5xl"
        >
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
              <>
                <div className="text-center">
                    <p className="text-sm text-text-muted">Ориентировочная стоимость</p>
                    <motion.p
                      key={result.totalByn}
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl"
                    >
                      {result.totalByn.toLocaleString("ru")} BYN
                    </motion.p>
                    <p className="mt-1 text-base text-primary sm:text-lg">
                      ≈ ${result.totalUsd.toLocaleString("ru")}
                    </p>
                  </div>
                  <p className="mt-4 text-center text-xs text-text-muted">
                    * С наценкой 35%. Точная смета — после замера.
                  </p>
                  <Button asChild variant="primary" size="lg" className="mt-5 w-full min-h-[48px] whitespace-normal text-center py-3 text-sm tracking-normal sm:mt-6 sm:text-base sm:tracking-[0.2em]">
                    <Link href="/kalkulyator" className="flex items-center justify-center px-4">Получить точную смету</Link>
                  </Button>
              </>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
