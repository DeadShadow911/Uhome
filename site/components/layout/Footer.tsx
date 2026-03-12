import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const footerLinks = {
  services: [
    { label: "Ремонт квартир", href: "/uslugi/remont-kvartir" },
    { label: "Ремонт домов", href: "/uslugi/remont-domov" },
    { label: "Капитальный ремонт", href: "/uslugi/kapitalnyj-remont" },
  ],
  company: [
    { label: "О компании", href: "/o-kompanii" },
    { label: "Портфолио", href: "/portfolio" },
    { label: "Отзывы", href: "/otzyvy" },
    { label: "Блог", href: "/blog" },
  ],
  info: [
    { label: "Контакты", href: "/kontakty" },
    { label: "FAQ", href: "/faq" },
    { label: "Быстрый расчёт", href: "/kalkulyator" },
    { label: "Политика конфиденциальности", href: "/politika-konfidencialnosti" },
  ],
};

const socials = [
  { label: "Telegram", href: siteConfig.socials.telegram, icon: "/icons/telegram.svg" },
  { label: "WhatsApp", href: siteConfig.socials.whatsapp, icon: "/icons/whatsapp.svg" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-12 md:py-16">
        <div className="grid min-w-0 grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="font-heading text-2xl font-bold">
              UHome
            </Link>
            <p className="mt-4 text-sm text-white/80">
              Профессиональный ремонт квартир и частных домов под ключ. {siteConfig.stats.yearsExperience} лет опыта, {siteConfig.stats.projectsCount}+ объектов, гарантия {siteConfig.stats.warrantyLabel}.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex min-h-[44px] items-center gap-2 text-white/90 hover:text-white"
              >
                <Phone className="size-4 shrink-0" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex min-h-[44px] items-center gap-2 text-white/90 hover:text-white"
              >
                <Mail className="size-4 shrink-0" />
                {siteConfig.email}
              </a>
              <div className="flex min-w-0 items-start gap-2 text-white/90">
                <MapPin className="size-4 shrink-0 mt-0.5" />
                <span className="break-words">{siteConfig.address}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white"
                  aria-label={label}
                >
                  <img src={icon} alt="" className="size-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/60">
              Услуги
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block min-h-[36px] py-1 text-sm text-white/90 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/60">
              Компания
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block min-h-[36px] py-1 text-sm text-white/90 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/60">
              Информация
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block min-h-[36px] py-1 text-sm text-white/90 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 min-w-0 border-t border-white/20 pt-8 text-center text-sm text-white/60">
          UHome © {new Date().getFullYear()} |{" "}
          <Link href="/politika-konfidencialnosti" className="underline hover:text-white/80">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
