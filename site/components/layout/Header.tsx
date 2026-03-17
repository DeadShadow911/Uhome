"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trackGAEvent } from "@/components/analytics/Analytics";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, Calculator } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  {
    label: "Услуги",
    href: "/uslugi",
    children: [
      { label: "Ремонт квартир", href: "/uslugi/remont-kvartir" },
      { label: "Ремонт домов", href: "/uslugi/remont-domov" },
      { label: "Черновая отделка", href: "/uslugi/chernovaya-otdelka" },
      { label: "Чистовая отделка", href: "/uslugi/chistovaya-otdelka" },
      { label: "Капитальный ремонт", href: "/uslugi/kapitalnyj-remont" },
      { label: "Строительство домов", href: "/uslugi/stroitelstvo-domov" },
      { label: "Бани", href: "/uslugi/bani" },
      { label: "Гаражи и хозпостройки", href: "/uslugi/garazhi-hospostroyki" },
      { label: "Беседки и навесы", href: "/uslugi/besedki-navesy" },
      { label: "Благоустройство территории", href: "/uslugi/blagoustrojstvo" },
    ],
  },
  { label: "Портфолио", href: "/portfolio" },
  { label: "Быстрый расчёт", href: "/kalkulyator" },
  { label: "О нас", href: "/o-kompanii" },
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "/kontakty" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="container mx-auto flex h-14 min-h-[56px] items-center justify-between gap-2 px-4 sm:px-6 lg:h-20 lg:gap-4">
        <Link href="/" className="flex shrink-0 flex-col">
          <span className="font-heading text-xl font-bold text-primary lg:text-2xl">UHome</span>
          <span className="block text-[0.6rem] sm:text-[0.65rem] tracking-wide text-primary/70">Дом начинается с тебя</span>
        </Link>

        {/* Телефон и Telegram — видны на мобильных с первого входа */}
        <div className="flex min-w-0 shrink items-center gap-0.5 sm:gap-1 lg:hidden">
          <PhoneLink
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            location="header_mobile"
            className="flex min-h-[44px] items-center gap-1 rounded-lg px-2 py-2 text-primary hover:bg-black/5 active:bg-black/10"
          >
            <Phone className="size-4 shrink-0 sm:size-5" />
            <span className="truncate text-[11px] font-medium leading-tight sm:text-sm">{siteConfig.phone}</span>
          </PhoneLink>
          <a
            href={siteConfig.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg p-2 text-primary hover:bg-black/5 active:bg-black/10"
            aria-label="Написать в Telegram"
          >
            <img src="/icons/telegram.svg" alt="" className="size-5 shrink-0" aria-hidden />
          </a>
          {siteConfig.socials.instagram && (
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg p-2 text-primary hover:bg-black/5 active:bg-black/10"
              aria-label="Instagram"
            >
              <img src="/icons/instagram.svg" alt="" className="size-5 shrink-0" aria-hidden />
            </a>
          )}
        </div>

        <nav className="hidden items-center gap-6 lg:flex lg:gap-8">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-primary/80 transition hover:text-primary"
                >
                  {item.label}
                </Link>
                {servicesOpen && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="w-56 rounded-lg border border-black/10 bg-white py-2 shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-primary hover:bg-black/5"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-primary/80 transition hover:text-primary"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Button asChild size="sm" variant="primary" className="gap-2">
            <Link
              href="/kalkulyator"
              onClick={() => trackGAEvent("click", { event_category: "cta", event_label: "header_kalkulyator" })}
            >
              <Calculator className="size-4" />
              Быстрый расчёт
            </Link>
          </Button>
          <PhoneLink
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            location="header"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <Phone className="size-4" />
            <span className="font-medium">{siteConfig.phone}</span>
          </PhoneLink>
          <a
            href={siteConfig.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-cta p-2 text-white shadow-md transition hover:bg-cta-hover hover:shadow-lg active:scale-[0.98]"
            aria-label="Написать в Telegram"
          >
            <img src="/icons/telegram.svg" alt="" className="size-5 brightness-0 invert" aria-hidden />
          </a>
          {siteConfig.socials.instagram && (
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-2 border-primary/20 p-2 text-primary transition hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
              aria-label="Instagram"
            >
              <img src="/icons/instagram.svg" alt="" className="size-5" aria-hidden />
            </a>
          )}
        </div>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-primary hover:bg-black/5 active:bg-black/10 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-black/10 bg-white lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4 sm:px-6">
            {navItems.flatMap((item) =>
              item.children
                ? [
                    <span
                      key={item.href}
                      className="px-2 py-1 text-xs font-semibold uppercase text-primary/60"
                    >
                      {item.label}
                    </span>,
                    ...item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block min-h-[44px] px-4 py-3 leading-[44px] text-primary hover:bg-black/5 active:bg-black/5"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    )),
                  ]
                : [
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block min-h-[44px] px-4 py-3 font-medium leading-[44px] text-primary hover:bg-black/5 active:bg-black/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>,
                  ]
            )}
            <div className="mt-4 flex flex-col gap-2 border-t border-black/10 pt-4">
              <Button asChild variant="primary" className="min-h-[48px] w-full gap-2">
                <Link
                  href="/kalkulyator"
                  onClick={() => {
                    setMobileOpen(false);
                    trackGAEvent("click", { event_category: "cta", event_label: "mobile_kalkulyator" });
                  }}
                >
                  <Calculator className="size-4" />
                  Быстрый расчёт
                </Link>
              </Button>
              <PhoneLink
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                location="header_mobile_menu"
                className={cn(
                  "flex min-h-[48px] items-center justify-center gap-2 rounded-lg py-3",
                  "border border-black/20 text-primary hover:bg-black/5 active:bg-black/10"
                )}
              >
                <Phone className="size-4" />
                {siteConfig.phone}
              </PhoneLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
