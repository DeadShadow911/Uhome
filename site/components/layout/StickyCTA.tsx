"use client";

import Link from "next/link";
import { Calculator } from "lucide-react";
import { trackGAEvent } from "@/components/analytics/Analytics";

export function StickyCTA() {
  return (
    <div className="sticky-cta-wrap fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pt-3 md:hidden">
      <Link
        href="/kalkulyator"
        onClick={() => trackGAEvent("click", { event_category: "cta", event_label: "sticky_kalkulyator" })}
        className="flex min-h-[52px] w-full max-w-[400px] items-center justify-center gap-2 rounded-full bg-cta px-6 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition hover:bg-cta-hover active:scale-[0.98] active:bg-cta-hover"
      >
        <Calculator className="size-5" />
        Быстрый расчёт
      </Link>
    </div>
  );
}
