import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/mock-data";
import { ServicesTabs } from "@/components/uslugi/ServicesTabs";
import { Button } from "@/components/ui/button";

export default function UslugiPage() {
  const firstImage = services[0]?.images?.[0];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[40vh] overflow-hidden sm:min-h-[45vh]">
        <div className="absolute inset-0">
          <Image
            src={firstImage ?? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        <div className="relative container mx-auto flex min-h-[40vh] flex-col justify-center px-4 py-16 sm:min-h-[45vh] sm:px-6 md:px-8">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Наши услуги
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/90 sm:text-lg">
            Ремонт, отделка и строительство домов, бань, придомовых построек под ключ в Гродно и области
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:px-8">
        <ServicesTabs services={services} className="mt-0" />

        {/* CTA под карточками */}
        <div className="mt-16 rounded-2xl bg-primary px-6 py-10 text-center text-white sm:px-10 sm:py-14">
          <h2 className="font-heading text-xl font-bold sm:text-2xl">
            Не нашли нужную услугу?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-white/90">
            Опишите задачу — мы подберём решение и рассчитаем стоимость
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild variant="secondary" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-cta">
              <Link href="/kalkulyator">Калькулятор</Link>
            </Button>
            <Button asChild variant="secondary" className="border-white text-white hover:bg-white hover:text-cta">
              <Link href="/kontakty">Связаться с нами</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
