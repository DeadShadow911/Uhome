import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ContactsForm } from "@/components/forms/ContactsForm";

export default function KontaktyPage() {
  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl lg:text-5xl">
          Контакты
        </h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          Свяжитесь с нами для расчёта стоимости и консультации
        </p>

        <div className="mt-10 grid gap-8 sm:mt-16 sm:gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-lg font-semibold text-primary">
                Реквизиты
              </h2>
              <div className="mt-4 space-y-4">
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-primary hover:text-accent"
                >
                  <Phone className="size-5 shrink-0" />
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-primary hover:text-accent"
                >
                  <Mail className="size-5 shrink-0" />
                  {siteConfig.email}
                </a>
                <div className="flex min-w-0 items-start gap-3 text-primary">
                  <MapPin className="size-5 shrink-0 mt-0.5" />
                  <span className="break-words">{siteConfig.address}</span>
                </div>
                <div className="flex items-center gap-3 text-primary">
                  <Clock className="size-5 shrink-0" />
                  <span>{siteConfig.schedule}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-primary/10 bg-white p-6">
              <h3 className="font-heading font-semibold text-primary">Форма обратной связи</h3>
              <ContactsForm />
            </div>
          </div>

          <div className="h-64 overflow-hidden rounded-xl bg-primary/10 sm:h-80 lg:h-full">
            <iframe
              title="Карта"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.697101755987!2d23.8297!3d53.6884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQxJzE4LjIiTiAyM8KwNDknNDYuOSJF!5e0!3m2!1sru!2sby!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
