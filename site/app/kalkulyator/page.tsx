"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { calculateCost, type CalculatorParams } from "@/lib/calculator";
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

export default function KalkulyatorPage() {
  const [params, setParams] = useState<CalculatorParams>(initialParams);
  const [result, setResult] = useState<ReturnType<typeof calculateCost>>(() =>
    calculateCost(initialParams)
  );

  useEffect(() => {
    setResult(calculateCost(params));
  }, [params]);

  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl lg:text-5xl">
          Калькулятор стоимости
        </h1>
        <p className="mt-3 sm:mt-4 max-w-2xl text-text-muted text-sm sm:text-base">
          Ориентировочный расчёт. Точная смета — после бесплатного замера.
        </p>

        <div className="mt-8 grid min-w-0 grid-cols-1 gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-3 lg:gap-8">
          <div className="min-w-0 lg:col-span-2 rounded-xl border border-primary/10 bg-white p-4 shadow-lg sm:rounded-2xl sm:p-6 md:p-8">
            <div className="min-w-0 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-primary">Тип объекта</label>
                <select
                  value={params.objectType}
                  onChange={(e) =>
                    setParams((p) => ({
                      ...p,
                      objectType: e.target.value as "apartment" | "house",
                    }))
                  }
                  className="w-full min-w-0 min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3"
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
                      className="w-full min-w-0 min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3"
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
                      className="w-full min-w-0 min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3"
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
                      className="w-full accent-accent"
                    />
                  </div>
                  <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="min-w-0">
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
                        className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3"
                      />
                    </div>
                    <div className="min-w-0">
                      <label className="mb-2 block text-sm font-medium text-primary">Комнат</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={params.rooms ?? 2}
                        onChange={(e) =>
                          setParams((p) => ({ ...p, rooms: Number(e.target.value) }))
                        }
                        className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3"
                      />
                    </div>
                    <div className="min-w-0">
                      <label className="mb-2 block text-sm font-medium text-primary">Санузлов</label>
                      <input
                        type="number"
                        min={1}
                        max={4}
                        value={params.bathrooms ?? 1}
                        onChange={(e) =>
                          setParams((p) => ({ ...p, bathrooms: Number(e.target.value) }))
                        }
                        className="w-full min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3"
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
                          className="w-full min-w-0 min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3"
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
                          className="w-full min-w-0 min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3"
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
                      className="w-full accent-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-primary">Пакет</label>
                    <select
                      value={params.housePackage ?? "blocks_full"}
                      onChange={(e) =>
                        setParams((p) => ({ ...p, housePackage: e.target.value }))
                      }
                      className="w-full min-w-0 min-h-[48px] rounded-lg border border-primary/20 bg-background px-4 py-3"
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
          </div>

          <div className="min-w-0 rounded-xl border border-primary/10 bg-primary p-4 text-white sm:rounded-2xl sm:p-6 md:p-8 lg:sticky lg:top-24">
            <>
                <h3 className="font-heading text-lg font-semibold">Ориентировочная стоимость</h3>
                <p className="mt-4 font-heading text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  {result.totalByn.toLocaleString("ru")} BYN
                </p>
                <p className="text-white/80">≈ ${result.totalUsd.toLocaleString("ru")}</p>
                <p className="mt-4 text-xs text-white/60">* С наценкой 35%</p>

                {result.items.length > 1 && (
                  <div className="mt-6 space-y-2 border-t border-white/20 pt-4 sm:mt-8 sm:pt-6">
                    {result.items.slice(0, 5).map((item) => (
                      <div
                        key={item.name}
                        className="flex min-w-0 justify-between gap-2 text-sm"
                      >
                        <span className="truncate text-white/80">{item.name}</span>
                        <span className="shrink-0">{item.sumByn.toLocaleString("ru")} BYN</span>
                      </div>
                    ))}
                    {result.items.length > 5 && (
                      <p className="text-xs text-white/60">
                        +{result.items.length - 5} позиций
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-6 space-y-3 sm:mt-8">
                  <Button
                    asChild
                    variant="primary"
                    size="lg"
                    className="w-full min-h-[48px] whitespace-normal text-center py-3 px-4 text-sm tracking-normal sm:text-base sm:tracking-[0.2em] bg-white text-primary hover:bg-white/90"
                  >
                    <a href={`mailto:${siteConfig.email}?subject=Запрос сметы`} className="flex items-center justify-center w-full">
                      Получить точную смету на email
                    </a>
                  </Button>
                  <Button asChild variant="secondary" size="md" className="w-full min-h-[48px] whitespace-normal text-center py-3 border-white text-white hover:bg-white hover:text-primary">
                    <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>Позвонить</a>
                  </Button>
                </div>
            </>
          </div>
        </div>
      </div>
    </main>
  );
}
