import Link from "next/link";
import { processSteps } from "@/lib/mock-data";
import { Award, Users, Shield } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function OKompaniiPage() {
  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl lg:text-5xl">
          О компании
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-text-muted">
          UHome — компания с {siteConfig.stats.yearsExperience}-летней историей на рынке ремонта и отделки.
          Мы выполняем ремонт квартир и строительство частных домов под ключ в Гродно и области.
        </p>

        <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-primary/10 bg-white p-6 text-center">
            <Award className="mx-auto size-12 text-accent" />
            <h3 className="mt-4 font-heading font-semibold text-primary">{siteConfig.stats.yearsExperience} лет</h3>
            <p className="text-sm text-text-muted">на рынке</p>
          </div>
          <div className="rounded-xl border border-primary/10 bg-white p-6 text-center">
            <Users className="mx-auto size-12 text-accent" />
            <h3 className="mt-4 font-heading font-semibold text-primary">{siteConfig.stats.projectsCount}+</h3>
            <p className="text-sm text-text-muted">выполненных объектов</p>
          </div>
          <div className="rounded-xl border border-primary/10 bg-white p-6 text-center">
            <Shield className="mx-auto size-12 text-accent" />
            <h3 className="mt-4 font-heading font-semibold text-primary">{siteConfig.stats.warrantyYears} лет</h3>
            <p className="text-sm text-text-muted">гарантии</p>
          </div>
        </div>

        <section className="mt-24">
          <h2 className="font-heading text-2xl font-bold text-primary">
            Процесс работы
          </h2>
          <div className="mt-8 space-y-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="flex gap-4 sm:gap-6 rounded-xl border border-primary/10 bg-white p-4 sm:p-6"
              >
                <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-full bg-accent/10 font-heading font-bold text-accent">
                  {step.step}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-semibold text-primary">{step.title}</h3>
                  <p className="mt-1 text-text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href="/portfolio"
            className="inline-flex items-center rounded-lg bg-accent px-6 py-3 font-medium text-white hover:bg-accent/90"
          >
            Портфолио
          </Link>
          <Link
            href="/kontakty"
            className="inline-flex items-center rounded-lg border-2 border-primary px-6 py-3 font-medium text-primary hover:bg-primary hover:text-white"
          >
            Контакты
          </Link>
        </div>
      </div>
    </main>
  );
}
